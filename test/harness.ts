// Test helpers for offline conformance checks against Figma's vendored OpenAPI spec.
import { fileURLToPath } from "node:url";
import { discoverTools, type ToolWithDefinition } from "../lib/tools.ts";

export interface CapturedRequest {
  method: string;
  path: string;
  query: Record<string, string>;
  body: unknown;
}

export interface SpecMatch {
  template: string;
  item: Record<string, any>;
}

export async function loadSpec(): Promise<any> {
  const specFile = fileURLToPath(new URL("../spec/figma-openapi.json", import.meta.url));
  return Bun.file(specFile).json();
}

export async function loadTools(): Promise<ToolWithDefinition[]> {
  return discoverTools();
}

// Build a representative argument object from a tool's own parameter schema so
// every exposed field (path, query, body) is exercised against the spec.
export function generateSampleArgs(def: any): Record<string, any> {
  const props = def?.parameters?.properties ?? {};
  const args: Record<string, any> = {};
  for (const [key, schema] of Object.entries<any>(props)) {
    args[key] = sampleValue(key, schema);
  }
  return args;
}

function sampleValue(key: string, schema: any): any {
  switch (schema?.type) {
    case "number":
    case "integer":
      return 1;
    case "boolean":
      return true;
    case "array":
      return [{}];
    case "object":
      return {};
    default:
      return `sample_${key}`;
  }
}

// Run a tool with fetch stubbed and capture the outgoing HTTP request.
export async function captureRequest(
  tool: ToolWithDefinition,
  args: Record<string, any>
): Promise<CapturedRequest> {
  process.env.FIGMA_API_KEY ||= "test-token";
  const original = globalThis.fetch;
  let captured: CapturedRequest | undefined;

  globalThis.fetch = (async (input: any, init: any = {}) => {
    const url = new URL(typeof input === "string" ? input : input.url);
    const query: Record<string, string> = {};
    url.searchParams.forEach((value, key) => {
      query[key] = value;
    });
    let body: unknown;
    if (init?.body != null) {
      try {
        body = JSON.parse(init.body);
      } catch {
        body = init.body;
      }
    }
    captured = {
      method: (init?.method ?? "GET").toUpperCase(),
      path: url.pathname,
      query,
      body,
    };
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  }) as any;

  try {
    await tool.function(args);
  } finally {
    globalThis.fetch = original;
  }

  if (!captured) {
    throw new Error("Tool did not perform an HTTP request");
  }
  return captured;
}

function templateToRegex(template: string): RegExp {
  const parts = template.split("/").map((seg) =>
    /^\{.+\}$/.test(seg) ? "[^/]+" : seg.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  );
  return new RegExp("^" + parts.join("/") + "$");
}

// Match a concrete request path to the most specific spec path template.
export function matchSpecPath(spec: any, pathname: string): SpecMatch | undefined {
  const candidates: { template: string; item: any; literals: number }[] = [];
  for (const [template, item] of Object.entries<any>(spec.paths ?? {})) {
    if (templateToRegex(template).test(pathname)) {
      const literals = template
        .split("/")
        .filter((seg) => seg && !/^\{.+\}$/.test(seg)).length;
      candidates.push({ template, item, literals });
    }
  }
  if (!candidates.length) return undefined;
  candidates.sort((a, b) => b.literals - a.literals);
  return { template: candidates[0].template, item: candidates[0].item };
}

function resolveRef(spec: any, node: any): any {
  const seen = new Set<string>();
  let current = node;
  while (current && current.$ref && !seen.has(current.$ref)) {
    seen.add(current.$ref);
    const parts = current.$ref.replace(/^#\//, "").split("/");
    let target = spec;
    for (const part of parts) target = target?.[part];
    current = target;
  }
  return current;
}

// Names of parameters (query or path) allowed by the spec for an operation.
export function specParams(
  spec: any,
  item: any,
  method: string,
  location: "query" | "path"
): string[] {
  const op = item[method.toLowerCase()] ?? {};
  const all = [...(item.parameters ?? []), ...(op.parameters ?? [])]
    .map((p) => resolveRef(spec, p))
    .filter(Boolean);
  return all.filter((p) => p.in === location).map((p) => p.name);
}

// Top-level request body property names allowed by the spec, or null when the
// operation has no JSON body schema (so callers can skip the assertion).
export function specBodyProps(spec: any, item: any, method: string): string[] | null {
  const op = item[method.toLowerCase()] ?? {};
  const schema = op?.requestBody?.content?.["application/json"]?.schema;
  if (!schema) return null;

  const props: Record<string, unknown> = {};
  const collect = (node: any) => {
    const resolved = resolveRef(spec, node);
    if (!resolved) return;
    if (resolved.properties) Object.assign(props, resolved.properties);
    if (Array.isArray(resolved.allOf)) resolved.allOf.forEach(collect);
  };
  collect(schema);

  const keys = Object.keys(props);
  return keys.length ? keys : null;
}

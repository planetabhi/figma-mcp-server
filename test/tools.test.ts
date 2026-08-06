// Offline conformance tests: validates every tool's structure and checks that
// the request it sends matches Figma's vendored OpenAPI spec (spec/figma-openapi.json).
// Refresh the spec with `bun run update-spec`.
import { describe, expect, test } from "bun:test";
import {
  captureRequest,
  generateSampleArgs,
  loadSpec,
  loadTools,
  matchSpecPath,
  specBodyProps,
  specParams,
} from "./harness.ts";

const spec = await loadSpec();
const tools = await loadTools();

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

describe("tool registry", () => {
  test("has tools", () => {
    expect(tools.length).toBeGreaterThan(0);
  });

  test("tool names are unique", () => {
    const names = tools.map((t) => t.definition.function.name);
    const duplicates = names.filter((n, i) => names.indexOf(n) !== i);
    expect(duplicates).toEqual([]);
  });

  test("vendored spec is loaded", () => {
    expect(spec?.info?.version).toBeString();
    expect(Object.keys(spec?.paths ?? {}).length).toBeGreaterThan(0);
  });
});

for (const tool of tools) {
  const def = tool.definition.function;

  describe(def.name, () => {
    test("has a valid definition", () => {
      assert(tool.definition?.type === "function", "definition.type must be 'function'");
      assert(typeof def.name === "string" && def.name.length > 0, "missing tool name");
      assert(
        typeof def.description === "string" && def.description.trim().length > 0,
        "missing tool description"
      );

      const params = def.parameters;
      assert(params?.type === "object", "parameters.type must be 'object'");
      assert(params.properties && typeof params.properties === "object", "missing properties");

      const required = params.required ?? [];
      assert(Array.isArray(required), "required must be an array");
      for (const name of required) {
        assert(name in params.properties, `required '${name}' is not defined in properties`);
      }
      for (const [key, schema] of Object.entries<any>(params.properties)) {
        assert(schema?.type, `property '${key}' is missing a type`);
        assert(schema?.description, `property '${key}' is missing a description`);
      }
    });

    test("request conforms to the Figma OpenAPI spec", async () => {
      const args = generateSampleArgs(def);
      const req = await captureRequest(tool, args);

      const match = matchSpecPath(spec, req.path);
      assert(match, `no Figma spec path matches ${req.method} ${req.path}`);

      const method = req.method.toLowerCase();
      assert(
        method in match.item,
        `${req.method} is not defined on '${match.template}' (allowed: ${Object.keys(match.item)
          .filter((k) => ["get", "post", "put", "delete", "patch"].includes(k))
          .join(", ")})`
      );

      const allowedQuery = new Set(specParams(spec, match.item, method, "query"));
      const badQuery = Object.keys(req.query).filter((k) => !allowedQuery.has(k));
      assert(
        badQuery.length === 0,
        `query params not in spec for '${match.template}': ${badQuery.join(", ")}`
      );

      const bodyProps = specBodyProps(spec, match.item, method);
      if (bodyProps && req.body && typeof req.body === "object" && !Array.isArray(req.body)) {
        const allowedBody = new Set(bodyProps);
        const badBody = Object.keys(req.body as Record<string, unknown>).filter(
          (k) => !allowedBody.has(k)
        );
        assert(
          badBody.length === 0,
          `body fields not in spec for '${match.template}': ${badBody.join(", ")}`
        );
      }
    });
  });
}

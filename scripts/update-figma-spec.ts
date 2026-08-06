// Downloads the latest Figma OpenAPI spec and vendors it under spec/.
// Run: bun run update-spec
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parse as parseYaml } from "yaml";

const SPEC_URL =
  "https://raw.githubusercontent.com/figma/rest-api-spec/main/openapi/openapi.yaml";

const specDir = fileURLToPath(new URL("../spec", import.meta.url));
const outFile = path.join(specDir, "figma-openapi.json");

const res = await fetch(SPEC_URL);
if (!res.ok) {
  console.error(`Failed to download spec: ${res.status} ${res.statusText}`);
  process.exit(1);
}

const spec = parseYaml(await res.text());
await mkdir(specDir, { recursive: true });
await Bun.write(outFile, JSON.stringify(spec, null, 2) + "\n");

const version = spec?.info?.version ?? "unknown";
const pathCount = Object.keys(spec?.paths ?? {}).length;
console.log(`Saved Figma OpenAPI spec v${version} (${pathCount} paths) -> spec/figma-openapi.json`);

import path from "node:path";
import { fileURLToPath } from "node:url";

const specDir = fileURLToPath(new URL("../spec", import.meta.url));
const specFile = path.join(specDir, "figma-openapi.json");

async function readPaths(): Promise<string[]> {
  const file = Bun.file(specFile);
  if (!(await file.exists())) return [];
  const spec = await file.json();
  return Object.keys(spec?.paths ?? {}).sort();
}

const mode = process.argv[2];

if (mode === "snapshot") {
  const outFile = process.argv[3];
  if (!outFile) {
    console.error("Usage: bun scripts/spec-endpoint-diff.ts snapshot <outFile>");
    process.exit(1);
  }
  await Bun.write(outFile, JSON.stringify(await readPaths()));
  process.exit(0);
}

if (mode === "diff") {
  const snapshotFile = process.argv[3];
  const bodyFile = process.argv[4];
  if (!snapshotFile || !bodyFile) {
    console.error("Usage: bun scripts/spec-endpoint-diff.ts diff <snapshotFile> <bodyFile>");
    process.exit(1);
  }

  const snapshot = Bun.file(snapshotFile);
  const oldPaths: string[] = (await snapshot.exists()) ? await snapshot.json() : [];
  const newPaths = await readPaths();

  const oldSet = new Set(oldPaths);
  const newSet = new Set(newPaths);
  const added = newPaths.filter((p) => !oldSet.has(p));
  const removed = oldPaths.filter((p) => !newSet.has(p));

  const spec = await Bun.file(specFile).json();
  const version = spec?.info?.version ?? "unknown";

  const lines = [`Figma OpenAPI spec synced to **v${version}** (${newPaths.length} paths).`, ""];
  if (added.length === 0 && removed.length === 0) {
    lines.push("No endpoint-level changes (parameter/schema changes may still appear in the diff).");
  } else {
    if (added.length) {
      lines.push("### Added endpoints", ...added.map((p) => `- \`${p}\``), "");
    }
    if (removed.length) {
      lines.push("### Removed endpoints", ...removed.map((p) => `- \`${p}\``), "");
    }
    lines.push("New endpoints need a matching tool file before they are usable.");
  }

  await Bun.write(bodyFile, lines.join("\n") + "\n");
  process.exit(0);
}

console.error("Usage: bun scripts/spec-endpoint-diff.ts <snapshot|diff> ...");
process.exit(1);

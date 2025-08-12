import { toolPaths } from "../tools/paths.js";

export async function discoverTools() {
  const toolPromises = toolPaths.map(async (file) => {
    const module = await import(`../tools/${file}`);
    return {
      ...module.apiTool,
      path: file,
    };
  });
  return Promise.all(toolPromises);
}
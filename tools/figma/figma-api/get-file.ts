import { ApiTool, figmaRequest } from "../../../lib/tools.ts";

const executeFunction = async ({ file_key, version, ids, depth, geometry, plugin_data, branch_data }: any) => {
  return figmaRequest(`/v1/files/${file_key}`, {
    query: { version, ids, depth, geometry, plugin_data, branch_data }
  });
};

const apiTool: ApiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_figma_file',
      description: 'Retrieve the document tree and metadata of a Figma file as JSON.',
      parameters: {
        type: 'object',
        properties: {
          file_key: { type: 'string', description: 'The key of the Figma file (or branch key) to retrieve.' },
          version: { type: 'string', description: 'A specific version ID to get. Defaults to the current version.' },
          ids: { type: 'string', description: 'Comma-separated node IDs to return a subset of the document.' },
          depth: { type: 'number', description: 'How deep into the document tree to traverse (e.g. 1 = pages only, 2 = pages + top-level objects).' },
          geometry: { type: 'string', description: 'Set to "paths" to export vector data.' },
          plugin_data: { type: 'string', description: 'Comma-separated plugin IDs and/or "shared" to include their plugin data.' },
          branch_data: { type: 'boolean', description: 'Return branch metadata for the requested file. Default false.' }
        },
        required: ['file_key']
      }
    }
  }
};

export { apiTool };
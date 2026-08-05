import { ApiTool, figmaRequest } from "../../../lib/tools.ts";

const executeFunction = async ({ file_key, ids, version, depth, geometry, plugin_data }: any) => {
  return figmaRequest(`/v1/files/${file_key}/nodes`, {
    query: { ids, version, depth, geometry, plugin_data }
  });
};

const apiTool: ApiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_file_nodes',
      description: 'Retrieve specific nodes (and their subtrees) from a Figma file as JSON.',
      parameters: {
        type: 'object',
        properties: {
          file_key: {
            type: 'string',
            description: 'The key of the Figma file (or branch key).'
          },
          ids: {
            type: 'string',
            description: 'Comma-separated list of node IDs to retrieve.'
          },
          version: {
            type: 'string',
            description: 'A specific version ID to get. Defaults to the current version.'
          },
          depth: {
            type: 'number',
            description: 'How deep into each node tree to traverse (e.g. 1 = direct children only).'
          },
          geometry: {
            type: 'string',
            description: 'Set to "paths" to export vector data.'
          },
          plugin_data: {
            type: 'string',
            description: 'Comma-separated plugin IDs and/or "shared" to include their plugin data.'
          }
        },
        required: ['file_key', 'ids']
      }
    }
  }
};

export { apiTool };

import { ApiTool, figmaRequest } from "../../../lib/tools.ts";

const executeFunction = async ({ file_key, node_id, name, url }: any) => {
  return figmaRequest(`/v1/dev_resources`, {
    method: 'POST',
    body: { dev_resources: [{ name, url, file_key, node_id }] }
  });
};

const apiTool: ApiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_dev_resources',
      description: 'Create development resources for a Figma file.',
      parameters: {
        type: 'object',
        properties: {
          file_key: {
            type: 'string',
            description: 'The key of the Figma file.'
          },
          node_id: {
            type: 'string',
            description: 'The node ID for the resource.'
          },
          name: {
            type: 'string',
            description: 'The name of the development resource.'
          },
          url: {
            type: 'string',
            description: 'The URL for the development resource.'
          }
        },
        required: ['file_key', 'node_id', 'name', 'url']
      }
    }
  }
};

export { apiTool };
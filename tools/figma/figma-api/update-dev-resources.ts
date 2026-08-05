import { ApiTool, figmaRequest } from "../../../lib/tools.ts";

const executeFunction = async ({ dev_resources }: any) => {
  return figmaRequest(`/v1/dev_resources`, { method: 'PUT', body: { dev_resources } });
};

const apiTool: ApiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'update_dev_resources',
      description: 'Bulk update dev resources across files. Each item must include its id; name and url are optional.',
      parameters: {
        type: 'object',
        properties: {
          dev_resources: {
            type: 'array',
            description: 'An array of dev resources to update.',
            items: {
              type: 'object',
              properties: {
                id: { type: 'string', description: 'Unique identifier of the dev resource.' },
                name: { type: 'string', description: 'The new name of the dev resource.' },
                url: { type: 'string', description: 'The new URL of the dev resource.' }
              },
              required: ['id']
            }
          }
        },
        required: ['dev_resources']
      }
    }
  }
};

export { apiTool };

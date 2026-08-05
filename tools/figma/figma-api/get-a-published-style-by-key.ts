import { ApiTool, figmaRequest } from "../../../lib/tools.ts";

const executeFunction = async ({ key }: any) => {
  return figmaRequest(`/v1/styles/${key}`);
};

const apiTool: ApiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_published_style',
      description: 'Retrieve metadata for a published style by its key.',
      parameters: {
        type: 'object',
        properties: {
          key: {
            type: 'string',
            description: 'The key of the published style to retrieve.'
          }
        },
        required: ['key']
      }
    }
  }
};

export { apiTool };
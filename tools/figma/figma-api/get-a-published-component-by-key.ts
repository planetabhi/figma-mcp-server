import { ApiTool, figmaRequest } from "../../../lib/tools.ts";

const executeFunction = async ({ key }: any) => {
  return figmaRequest(`/v1/components/${key}`);
};

const apiTool: ApiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_published_component_by_key',
      description: 'Retrieve metadata for a published component by its key.',
      parameters: {
        type: 'object',
        properties: {
          key: {
            type: 'string',
            description: 'The key of the component to retrieve.'
          }
        },
        required: ['key']
      }
    }
  }
};

export { apiTool };
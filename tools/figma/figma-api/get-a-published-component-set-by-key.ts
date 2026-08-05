import { ApiTool, figmaRequest } from "../../../lib/tools.ts";

const executeFunction = async ({ key }: any) => {
  return figmaRequest(`/v1/component_sets/${key}`);
};

const apiTool: ApiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_component_set',
      description: 'Retrieve metadata for a published component set by its key.',
      parameters: {
        type: 'object',
        properties: {
          key: {
            type: 'string',
            description: 'The key of the component set to retrieve.'
          }
        },
        required: ['key']
      }
    }
  }
};

export { apiTool };
import { ApiTool, figmaRequest } from "../../../lib/tools.ts";

const executeFunction = async ({ file_key }: any) => {
  return figmaRequest(`/v1/files/${file_key}/components`);
};

const apiTool: ApiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'list_components',
      description: 'List components in a specific Figma file.',
      parameters: {
        type: 'object',
        properties: {
          file_key: {
            type: 'string',
            description: 'The key of the Figma file to retrieve components from.'
          }
        },
        required: ['file_key']
      }
    }
  }
};

export { apiTool };
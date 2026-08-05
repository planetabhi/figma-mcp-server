import { ApiTool, figmaRequest } from "../../../lib/tools.ts";

const executeFunction = async ({ file_key }: any) => {
  return figmaRequest(`/v1/files/${file_key}/comments`);
};

const apiTool: ApiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'list_comments',
      description: 'List comments on a Figma file.',
      parameters: {
        type: 'object',
        properties: {
          file_key: {
            type: 'string',
            description: 'The key of the Figma file to list comments from.'
          }
        },
        required: ['file_key']
      }
    }
  }
};

export { apiTool };
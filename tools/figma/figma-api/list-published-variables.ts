import { ApiTool, figmaRequest } from "../../../lib/tools.ts";

const executeFunction = async ({ file_key }: any) => {
  return figmaRequest(`/v1/files/${file_key}/variables/published`);
};

const apiTool: ApiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_published_variables',
      description: 'Get the variables and variable collections published from a file. Requires an Enterprise organization / plan access token.',
      parameters: {
        type: 'object',
        properties: {
          file_key: { type: 'string', description: 'The main file key to get published variables from (not a branch key).' }
        },
        required: ['file_key']
      }
    }
  }
};

export { apiTool };

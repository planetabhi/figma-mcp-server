import { ApiTool, figmaRequest } from "../../../lib/tools.ts";

const executeFunction = async () => {
  return figmaRequest(`/v1/me`);
};

const apiTool: ApiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_current_user',
      description: 'Get the current user information from Figma.',
      parameters: {
        type: 'object',
        properties: {},
        required: []
      }
    }
  }
};

export { apiTool };
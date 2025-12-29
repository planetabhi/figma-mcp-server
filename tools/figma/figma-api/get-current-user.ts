import { ApiTool, getFigmaToken } from "../../../lib/tools.ts";
const executeFunction = async () => {
  const baseUrl = 'https://api.figma.com';
  const token = getFigmaToken();
  try {
    const headers = {
      'X-Figma-Token': token
    };

    const response = await fetch(`${baseUrl}/v1/me`, {
      method: 'GET',
      headers
    });

    if (!response.ok) {
      const errorData = await response.json() as any;
      throw new Error(`Figma API Error: ${errorData.message || response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) { throw error; }
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
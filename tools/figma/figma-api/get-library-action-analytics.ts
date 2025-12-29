import { ApiTool, getFigmaToken } from "../../../lib/tools.ts";
const executeFunction = async ({ library_file_key }: any) => {
  const baseUrl = 'https://api.figma.com';
  const token = getFigmaToken();
  try {
    const url = `${baseUrl}/v1/analytics/libraries/${library_file_key}/actions`;

    const headers = {
      'X-Figma-Token': token
    };

    const response = await fetch(url, {
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
      name: 'get_library_action_analytics',
      description: 'Retrieve action analytics for a specific published library file.',
      parameters: {
        type: 'object',
        properties: {
          library_file_key: {
            type: 'string',
            description: 'The key of the library file for which to retrieve action analytics.'
          }
        },
        required: ['library_file_key']
      }
    }
  }
};

export { apiTool };
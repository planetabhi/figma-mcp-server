import { ApiTool, getFigmaToken } from "../../../lib/tools.ts";
const executeFunction = async ({ file_key }: any) => {
  const baseUrl = 'https://api.figma.com';
  const token = getFigmaToken();
  try {
    const url = `${baseUrl}/v1/files/${file_key}/versions`;

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
      name: 'get_file_version_history',
      description: 'Retrieve the version history of a specified Figma file.',
      parameters: {
        type: 'object',
        properties: {
          file_key: {
            type: 'string',
            description: 'The key of the Figma file for which to retrieve version history.'
          }
        },
        required: ['file_key']
      }
    }
  }
};

export { apiTool };
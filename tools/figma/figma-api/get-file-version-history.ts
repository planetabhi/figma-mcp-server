import { ApiTool } from "../../../lib/tools.ts";
const executeFunction = async ({ file_key }: any) => {
  const baseUrl = 'https://api.figma.com';
  const token = process.env.FIGMA_API_KEY || '';
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
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error retrieving file version history:', error);
    return { error: 'An error occurred while retrieving the file version history.' };
  }
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
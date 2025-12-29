import { ApiTool } from "../../../lib/tools.ts";
const executeFunction = async ({ file_key }: any) => {
  const baseUrl = 'https://api.figma.com';
  const token = process.env.FIGMA_API_KEY || '';

  try {
    const url = `${baseUrl}/v1/files/${file_key}/component_sets`;

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
    console.error('Error listing component sets:', error);
    return { error: 'An error occurred while listing component sets.' };
  }
};

const apiTool: ApiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'list_component_sets',
      description: 'List all component sets published in a specific Figma file.',
      parameters: {
        type: 'object',
        properties: {
          file_key: {
            type: 'string',
            description: 'The key of the Figma file to retrieve component sets from.'
          }
        },
        required: ['file_key']
      }
    }
  }
};

export { apiTool };
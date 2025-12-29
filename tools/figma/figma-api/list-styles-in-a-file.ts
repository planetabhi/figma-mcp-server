import { ApiTool } from "../../../lib/tools.ts";
const executeFunction = async ({ file_key }: any) => {
  const baseUrl = 'https://api.figma.com';
  const token = process.env.FIGMA_API_KEY || '';

  try {
    const url = `${baseUrl}/v1/files/${file_key}/styles`;

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
    console.error('Error listing styles in the Figma file:', error);
    return { error: 'An error occurred while listing styles in the Figma file.' };
  }
};

const apiTool: ApiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'list_styles_in_file',
      description: 'List styles in a specific Figma file.',
      parameters: {
        type: 'object',
        properties: {
          file_key: {
            type: 'string',
            description: 'The key of the Figma file to retrieve styles from.'
          }
        },
        required: ['file_key']
      }
    }
  }
};

export { apiTool };
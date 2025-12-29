import { ApiTool } from "../../../lib/tools.ts";
const executeFunction = async ({ file_key }: any) => {
  const baseUrl = 'https://api.figma.com';
  const token = process.env.FIGMA_API_KEY || '';
  try {
    const url = `${baseUrl}/v1/files/${file_key}/comments`;

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
    return (data as any).comments || [];
  } catch (error) {
    console.error('Error listing comments on the Figma file:', error);
    return { error: 'An error occurred while listing comments.' };
  }
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
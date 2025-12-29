import { ApiTool } from "../../../lib/tools.ts";
const executeFunction = async ({ file_key, node_id }: any) => {
  const baseUrl = 'https://api.figma.com';
  const token = process.env.FIGMA_API_KEY || '';
  try {
    const url = new URL(`${baseUrl}/v1/images/${file_key}`);
    if (node_id) {
      url.searchParams.append('ids', node_id);
    }

    const headers = {
      'X-Figma-Token': token
    };

    const response = await fetch(url.toString(), {
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
    console.error('Error getting image fills:', error);
    return { error: 'An error occurred while getting image fills.' };
  }
};

const apiTool: ApiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_image_fills',
      description: 'Get image fills from a Figma file.',
      parameters: {
        type: 'object',
        properties: {
          file_key: {
            type: 'string',
            description: 'The key of the Figma file.'
          },
          node_id: {
            type: 'string',
            description: 'The ID of the specific node to retrieve images for.'
          }
        },
        required: ['file_key']
      }
    }
  }
};

export { apiTool };
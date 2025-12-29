import { ApiTool, getFigmaToken } from "../../../lib/tools.ts";
const executeFunction = async ({ file_key, node_id }: any) => {
  const baseUrl = 'https://api.figma.com';
  const token = getFigmaToken();
  try {
    const url = new URL(`${baseUrl}/v1/files/${file_key}/nodes`);
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
    console.error('Error getting file nodes:', error);
    return { error: 'An error occurred while retrieving file nodes.' };
  }
};

const apiTool: ApiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_file_nodes',
      description: 'Retrieve specific nodes from a Figma file.',
      parameters: {
        type: 'object',
        properties: {
          file_key: {
            type: 'string',
            description: 'The key of the Figma file.'
          },
          node_id: {
            type: 'string',
            description: 'The ID of the node to retrieve.'
          }
        },
        required: ['file_key']
      }
    }
  }
};

export { apiTool };
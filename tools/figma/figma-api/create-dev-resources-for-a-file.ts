import { ApiTool } from "../../../lib/tools.ts";
const executeFunction = async ({ file_key, node_id, name, url }: any) => {
  const baseUrl = 'https://api.figma.com';
  const token = process.env.FIGMA_API_KEY || '';
  try {
    const url = `${baseUrl}/v1/files/${file_key}/dev_resources`;

    const headers = {
      'X-Figma-Token': token,
      'Content-Type': 'application/json'
    };

    const body = JSON.stringify({
      dev_resources: [
        {
          name,
          url,
          file_key,
          node_id
        }
      ]
    });

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating development resources:', error);
    return { error: 'An error occurred while creating development resources.' };
  }
};

const apiTool: ApiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_dev_resources',
      description: 'Create development resources for a Figma file.',
      parameters: {
        type: 'object',
        properties: {
          file_key: {
            type: 'string',
            description: 'The key of the Figma file.'
          },
          node_id: {
            type: 'string',
            description: 'The node ID for the resource.'
          },
          name: {
            type: 'string',
            description: 'The name of the development resource.'
          },
          url: {
            type: 'string',
            description: 'The URL for the development resource.'
          }
        },
        required: ['file_key', 'node_id', 'name', 'url']
      }
    }
  }
};

export { apiTool };
import { ApiTool, getFigmaToken } from "../../../lib/tools.ts";
const executeFunction = async ({ file_key, message, client_meta = {} }: any) => {
  const baseUrl = 'https://api.figma.com';
  const token = getFigmaToken();

  try {
    const url = `${baseUrl}/v1/files/${file_key}/comments`;

    const headers = {
      'X-Figma-Token': token,
      'Content-Type': 'application/json'
    };

    const body = JSON.stringify({
      message,
      client_meta
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
    console.error('Error posting comment to Figma file:', error);
    return { error: 'An error occurred while posting the comment.' };
  }
};

const apiTool: ApiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'post_comment',
      description: 'Post a comment to a Figma file.',
      parameters: {
        type: 'object',
        properties: {
          file_key: {
            type: 'string',
            description: 'The key of the Figma file to comment on.'
          },
          message: {
            type: 'string',
            description: 'The message of the comment.'
          },
          client_meta: {
            type: 'object',
            properties: {
              x: {
                type: 'number',
                description: 'The x-coordinate for the comment.'
              },
              y: {
                type: 'number',
                description: 'The y-coordinate for the comment.'
              },
              node_id: {
                type: 'string',
                description: 'The node ID for the comment.'
              }
            },
            description: 'Optional metadata for the comment\'s location.'
          }
        },
        required: ['file_key', 'message']
      }
    }
  }
};

export { apiTool };

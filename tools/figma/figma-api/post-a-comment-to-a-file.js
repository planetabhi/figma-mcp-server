/**
 * Function to post a comment to a Figma file.
 *
 * @param {Object} args - Arguments for the comment.
 * @param {string} args.file_key - The key of the Figma file to comment on.
 * @param {string} args.message - The message of the comment.
 * @param {Object} [args.client_meta] - Optional metadata for the comment's location.
 * @param {number} [args.client_meta.x] - The x-coordinate for the comment.
 * @param {number} [args.client_meta.y] - The y-coordinate for the comment.
 * @param {string} [args.client_meta.node_id] - The node ID for the comment.
 * @returns {Promise<Object>} - The result of the comment posting.
 */
const executeFunction = async ({ file_key, message, client_meta = {} }) => {
  const baseUrl = 'https://api.figma.com';
  const token = process.env.FIGMA_API_KEY;

  try {
    // Construct the URL for posting a comment
    const url = `${baseUrl}/v1/files/${file_key}/comments`;

    // Set up headers for the request
    const headers = {
      'X-Figma-Token': token,
      'Content-Type': 'application/json'
    };

    // Prepare the body of the request
    const body = JSON.stringify({
      message,
      client_meta
    });

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body
    });

    // Check if the response was successful
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData);
    }

    // Parse and return the response data
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error posting comment to Figma file:', error);
    return { error: 'An error occurred while posting the comment.' };
  }
};

/**
 * Tool configuration for posting comments to a Figma file.
 * @type {Object}
 */
const apiTool = {
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
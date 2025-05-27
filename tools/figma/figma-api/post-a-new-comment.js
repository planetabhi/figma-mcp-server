/**
 * Function to post a new comment on a Figma file.
 *
 * @param {Object} args - Arguments for the comment.
 * @param {string} args.file_key - The unique identifier of the file to which the comment should be added.
 * @param {string} args.node_id - The node ID where the comment is to be placed.
 * @param {string} args.message - The message content of the comment.
 * @returns {Promise<Object>} - The response from the Figma API after posting the comment.
 */
const executeFunction = async ({ file_key, node_id, message }) => {
  const baseUrl = 'https://api.figma.com/v1';
  const token = process.env.FIGMA_API_KEY;

  try {
    // Construct the URL for the API request
    const url = `${baseUrl}/files/${file_key}/comments`;

    // Prepare the request body
    const body = JSON.stringify({
      message: message,
      client_meta: {
        x: 0,
        y: 0,
        node_id: node_id
      }
    });

    // Set up headers for the request
    const headers = {
      'X-Figma-Token': token,
      'Content-Type': 'application/json'
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: body
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
    console.error('Error posting comment:', error);
    return { error: 'An error occurred while posting the comment.' };
  }
};

/**
 * Tool configuration for posting a new comment on a Figma file.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'post_new_comment',
      description: 'Post a new comment on a Figma file.',
      parameters: {
        type: 'object',
        properties: {
          file_key: {
            type: 'string',
            description: 'The unique identifier of the file to which the comment should be added.'
          },
          node_id: {
            type: 'string',
            description: 'The node ID where the comment is to be placed.'
          },
          message: {
            type: 'string',
            description: 'The message content of the comment.'
          }
        },
        required: ['file_key', 'node_id', 'message']
      }
    }
  }
};

export { apiTool };
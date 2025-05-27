/**
 * Function to reply to a comment on a Figma file.
 *
 * @param {Object} args - Arguments for the reply.
 * @param {string} args.message - The message for the new comment.
 * @param {string} args.comment_id - The identifier of the comment to which the reply is being made.
 * @param {string} args.file_key - The key of the Figma file.
 * @returns {Promise<Object>} - The result of the reply operation.
 */
const executeFunction = async ({ message, comment_id, file_key }) => {
  const baseUrl = 'https://api.figma.com/v1';
  const token = process.env.FIGMA_API_KEY;
  try {
    // Construct the URL for the API request
    const url = `${baseUrl}/files/${file_key}/comments`;

    // Set up headers for the request
    const headers = {
      'X-Figma-Token': token,
      'Content-Type': 'application/json'
    };

    // Prepare the body of the request
    const body = JSON.stringify({
      message,
      comment_id
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
    console.error('Error replying to comment:', error);
    return { error: 'An error occurred while replying to the comment.' };
  }
};

/**
 * Tool configuration for replying to comments on Figma.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'reply_to_comment',
      description: 'Reply to a comment on a Figma file.',
      parameters: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            description: 'The message for the new comment.'
          },
          comment_id: {
            type: 'string',
            description: 'The identifier of the comment to which the reply is being made.'
          },
          file_key: {
            type: 'string',
            description: 'The key of the Figma file.'
          }
        },
        required: ['message', 'comment_id', 'file_key']
      }
    }
  }
};

export { apiTool };
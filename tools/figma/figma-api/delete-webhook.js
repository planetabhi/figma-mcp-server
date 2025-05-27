/**
 * Function to delete a specific webhook from Figma.
 *
 * @param {Object} args - Arguments for the deletion.
 * @param {string} args.webhook_id - The ID of the webhook to delete.
 * @returns {Promise<Object>} - The result of the deletion operation.
 */
const executeFunction = async ({ webhook_id }) => {
  const baseUrl = 'https://api.figma.com/v1';
  const token = process.env.FIGMA_API_KEY;
  const webhookUrl = `${baseUrl}/webhooks/${webhook_id}`;

  try {
    // Set up headers for the request
    const headers = {
      'X-Figma-Token': token
    };

    // Perform the fetch request
    const response = await fetch(webhookUrl, {
      method: 'DELETE',
      headers
    });

    // Check if the response was successful
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData);
    }

    // Return the response data (should be empty for successful deletion)
    return {};
  } catch (error) {
    console.error('Error deleting webhook:', error);
    return { error: 'An error occurred while deleting the webhook.' };
  }
};

/**
 * Tool configuration for deleting a webhook from Figma.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'delete_webhook',
      description: 'Delete a specific webhook from Figma.',
      parameters: {
        type: 'object',
        properties: {
          webhook_id: {
            type: 'string',
            description: 'The ID of the webhook to delete.'
          }
        },
        required: ['webhook_id']
      }
    }
  }
};

export { apiTool };
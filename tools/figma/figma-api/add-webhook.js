/**
 * Function to add a webhook in Figma.
 *
 * @returns {Promise<Object>} - The result of the webhook addition.
 */
const executeFunction = async () => {
  const webhookUrl = 'https://api.figma.com/v2/webhooks';
  const token = process.env.FIGMA_API_KEY;
  try {
    // Set up headers for the request
    const headers = {
      'X-Figma-Token': token,
      'Content-Type': 'application/json'
    };

    // Perform the fetch request
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers
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
    console.error('Error adding webhook:', error);
    return { error: 'An error occurred while adding the webhook.' };
  }
};

/**
 * Tool configuration for adding a webhook in Figma.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'add_webhook',
      description: 'Add a webhook in Figma.',
      parameters: {
        type: 'object',
        properties: {},
        required: []
      }
    }
  }
};

export { apiTool };
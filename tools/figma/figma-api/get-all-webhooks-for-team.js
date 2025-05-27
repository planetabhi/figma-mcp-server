/**
 * Function to get all webhooks for a team in Figma.
 *
 * @returns {Promise<Object>} - The result of the webhook retrieval.
 */
const executeFunction = async () => {
  const webhookUrl = 'https://api.figma.com/v2/webhooks';
  const token = process.env.FIGMA_API_KEY;
  try {
    // Set up headers for the request
    const headers = {
      'X-Figma-Token': token
    };

    // Perform the fetch request
    const response = await fetch(webhookUrl, {
      method: 'GET',
      headers
    });

    // Check if the response was successful
    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData);
    }

    // Parse and return the response data
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error retrieving webhooks:', error);
    return { error: 'An error occurred while retrieving webhooks.' };
  }
};

/**
 * Tool configuration for getting all webhooks for a team in Figma.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_all_webhooks',
      description: 'Retrieve all webhooks for a team in Figma.',
      parameters: {
        type: 'object',
        properties: {},
        required: []
      }
    }
  }
};

export { apiTool };
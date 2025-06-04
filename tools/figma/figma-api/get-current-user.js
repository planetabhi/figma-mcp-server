/**
 * Function to get the current user information from Figma.
 *
 * @returns {Promise<Object>} - The information about the user associated with the access token.
 */
const executeFunction = async () => {
  const baseUrl = 'https://api.figma.com';
  const token = process.env.FIGMA_API_KEY;
  try {
    // Set up headers for the request
    const headers = {
      'X-Figma-Token': token
    };

    // Perform the fetch request
    const response = await fetch(`${baseUrl}/v1/me`, {
      method: 'GET',
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
    console.error('Error getting current user information:', error);
    return { error: 'An error occurred while getting user information.' };
  }
};

/**
 * Tool configuration for getting the current user information from Figma.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_current_user',
      description: 'Get the current user information from Figma.',
      parameters: {
        type: 'object',
        properties: {},
        required: []
      }
    }
  }
};

export { apiTool };
/**
 * Function to list published libraries in Figma.
 *
 * @returns {Promise<Array>} - A promise that resolves to an array of published libraries.
 */
const executeFunction = async () => {
  const baseUrl = 'https://api.figma.com/v1/libraries/published';
  const token = process.env.FIGMA_API_KEY;
  try {
    // Set up headers for the request
    const headers = {
      'X-Figma-Token': token
    };

    // Perform the fetch request
    const response = await fetch(baseUrl, {
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
    console.error('Error listing published libraries:', error);
    return { error: 'An error occurred while listing published libraries.' };
  }
};

/**
 * Tool configuration for listing published libraries in Figma.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'list_published_libraries',
      description: 'Returns all published libraries available to the authenticated user.',
      parameters: {
        type: 'object',
        properties: {},
        required: []
      }
    }
  }
};

export { apiTool };
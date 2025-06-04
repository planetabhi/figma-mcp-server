/**
 * Function to get library action analytics from Figma.
 *
 * @param {Object} args - Arguments for the analytics request.
 * @param {string} args.library_file_key - The key of the library file for which to retrieve action analytics.
 * @returns {Promise<Object>} - The result of the library action analytics request.
 */
const executeFunction = async ({ library_file_key }) => {
  const baseUrl = 'https://api.figma.com';
  const token = process.env.FIGMA_API_KEY;
  try {
    // Construct the URL for the request
    const url = `${baseUrl}/v1/analytics/libraries/${library_file_key}/actions`;

    // Set up headers for the request
    const headers = {
      'X-Figma-Token': token
    };

    // Perform the fetch request
    const response = await fetch(url, {
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
    console.error('Error retrieving library action analytics:', error);
    return { error: 'An error occurred while retrieving library action analytics.' };
  }
};

/**
 * Tool configuration for getting library action analytics from Figma.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_library_action_analytics',
      description: 'Retrieve action analytics for a specific published library file.',
      parameters: {
        type: 'object',
        properties: {
          library_file_key: {
            type: 'string',
            description: 'The key of the library file for which to retrieve action analytics.'
          }
        },
        required: ['library_file_key']
      }
    }
  }
};

export { apiTool };
/**
 * Function to get actions analytics for a specific library file in Figma.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.library_file_key - The key of the library file for which to retrieve actions analytics.
 * @returns {Promise<Object>} - The actions analytics related to the library file.
 */
const executeFunction = async ({ library_file_key }) => {
  const baseUrl = 'https://api.figma.com/v1';
  const token = process.env.FIGMA_API_KEY;

  try {
    // Construct the URL for the request
    const url = `${baseUrl}/analytics/libraries/${library_file_key}/actions`;

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
    console.error('Error getting actions analytics:', error);
    return { error: 'An error occurred while retrieving actions analytics.' };
  }
};

/**
 * Tool configuration for getting actions analytics for a library file in Figma.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_actions_analytics',
      description: 'Retrieve actions analytics for a specific library file in Figma.',
      parameters: {
        type: 'object',
        properties: {
          library_file_key: {
            type: 'string',
            description: 'The key of the library file for which to retrieve actions analytics.'
          }
        },
        required: ['library_file_key']
      }
    }
  }
};

export { apiTool };
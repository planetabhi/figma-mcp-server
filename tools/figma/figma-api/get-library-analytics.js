/**
 * Function to get library analytics from Figma.
 *
 * @param {Object} args - Arguments for the library analytics request.
 * @param {string} args.library_file_key - The unique identifier of the library file.
 * @returns {Promise<Object>} - The result of the library analytics request.
 */
const executeFunction = async ({ library_file_key }) => {
  const baseUrl = 'https://api.figma.com/v1';
  const token = process.env.FIGMA_API_KEY;
  try {
    // Construct the URL for the request
    const url = `${baseUrl}/analytics/libraries/${library_file_key}/usages`;

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
    console.error('Error getting library analytics:', error);
    return { error: 'An error occurred while retrieving library analytics.' };
  }
};

/**
 * Tool configuration for getting library analytics from Figma.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_library_analytics',
      description: 'Retrieve library analytics from Figma.',
      parameters: {
        type: 'object',
        properties: {
          library_file_key: {
            type: 'string',
            description: 'The unique identifier of the library file.'
          }
        },
        required: ['library_file_key']
      }
    }
  }
};

export { apiTool };
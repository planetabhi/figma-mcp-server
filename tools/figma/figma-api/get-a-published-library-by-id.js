/**
 * Function to get metadata for a published library in Figma by its ID.
 *
 * @param {Object} args - Arguments for the library retrieval.
 * @param {string} args.library_id - The ID of the library to retrieve.
 * @returns {Promise<Object>} - The metadata of the published library.
 */
const executeFunction = async ({ library_id }) => {
  const baseUrl = 'https://api.figma.com';
  const token = process.env.FIGMA_API_KEY;
  try {
    // Construct the URL with the library ID
    const url = `${baseUrl}/v1/libraries/${library_id}`;

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
    console.error('Error retrieving library metadata:', error);
    return { error: 'An error occurred while retrieving library metadata.' };
  }
};

/**
 * Tool configuration for retrieving library metadata in Figma.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_library_by_id',
      description: 'Retrieve metadata for a published library by its ID.',
      parameters: {
        type: 'object',
        properties: {
          library_id: {
            type: 'string',
            description: 'The ID of the library to retrieve.'
          }
        },
        required: ['library_id']
      }
    }
  }
};

export { apiTool };
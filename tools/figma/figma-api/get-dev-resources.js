/**
 * Function to retrieve development resources for a specific Figma file.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.file_key - The unique key of the Figma file.
 * @returns {Promise<Object>} - The details of the development resources related to the specified file.
 */
const executeFunction = async ({ file_key }) => {
  const baseUrl = 'https://api.figma.com/v1';
  const token = process.env.FIGMA_API_KEY;

  try {
    // Construct the URL for the request
    const url = `${baseUrl}/files/${file_key}/dev_resources`;

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
    console.error('Error retrieving development resources:', error);
    return { error: 'An error occurred while retrieving development resources.' };
  }
};

/**
 * Tool configuration for retrieving development resources from Figma.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_dev_resources',
      description: 'Retrieve development resources for a specific Figma file.',
      parameters: {
        type: 'object',
        properties: {
          file_key: {
            type: 'string',
            description: 'The unique key of the Figma file.'
          }
        },
        required: ['file_key']
      }
    }
  }
};

export { apiTool };
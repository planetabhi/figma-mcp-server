/**
 * Function to get the version history of a Figma file.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.file_key - The key of the Figma file for which to retrieve version history.
 * @returns {Promise<Object>} - The version history of the specified Figma file.
 */
const executeFunction = async ({ file_key }) => {
  const baseUrl = 'https://api.figma.com';
  const token = process.env.FIGMA_API_KEY;
  try {
    // Construct the URL for the request
    const url = `${baseUrl}/v1/files/${file_key}/versions`;

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
    console.error('Error retrieving file version history:', error);
    return { error: 'An error occurred while retrieving the file version history.' };
  }
};

/**
 * Tool configuration for retrieving the version history of a Figma file.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_file_version_history',
      description: 'Retrieve the version history of a specified Figma file.',
      parameters: {
        type: 'object',
        properties: {
          file_key: {
            type: 'string',
            description: 'The key of the Figma file for which to retrieve version history.'
          }
        },
        required: ['file_key']
      }
    }
  }
};

export { apiTool };
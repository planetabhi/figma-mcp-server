/**
 * Function to get comments for a specific Figma file.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.file_key - The key of the Figma file to retrieve comments from.
 * @returns {Promise<Object>} - The comments associated with the specified file.
 */
const executeFunction = async ({ file_key }) => {
  const baseUrl = 'https://api.figma.com/v1';
  const token = process.env.FIGMA_API_KEY;

  try {
    // Construct the URL for the request
    const url = `${baseUrl}/files/${file_key}/comments`;

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
    console.error('Error getting file comments:', error);
    return { error: 'An error occurred while retrieving file comments.' };
  }
};

/**
 * Tool configuration for getting comments from a Figma file.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_file_comments',
      description: 'Retrieve comments associated with a specific Figma file.',
      parameters: {
        type: 'object',
        properties: {
          file_key: {
            type: 'string',
            description: 'The key of the Figma file to retrieve comments from.'
          }
        },
        required: ['file_key']
      }
    }
  }
};

export { apiTool };
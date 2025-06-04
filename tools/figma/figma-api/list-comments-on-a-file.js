/**
 * Function to list comments on a Figma file.
 *
 * @param {Object} args - Arguments for the comment listing.
 * @param {string} args.file_key - The key of the Figma file to list comments from.
 * @returns {Promise<Array>} - A promise that resolves to an array of comments.
 */
const executeFunction = async ({ file_key }) => {
  const baseUrl = 'https://api.figma.com';
  const token = process.env.FIGMA_API_KEY;
  try {
    // Construct the URL for the API request
    const url = `${baseUrl}/v1/files/${file_key}/comments`;

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
    return data.comments || [];
  } catch (error) {
    console.error('Error listing comments on the Figma file:', error);
    return { error: 'An error occurred while listing comments.' };
  }
};

/**
 * Tool configuration for listing comments on a Figma file.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'list_comments',
      description: 'List comments on a Figma file.',
      parameters: {
        type: 'object',
        properties: {
          file_key: {
            type: 'string',
            description: 'The key of the Figma file to list comments from.'
          }
        },
        required: ['file_key']
      }
    }
  }
};

export { apiTool };
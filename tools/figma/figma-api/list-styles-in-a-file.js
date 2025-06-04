/**
 * Function to list styles in a specific Figma file.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.file_key - The key of the Figma file to retrieve styles from.
 * @returns {Promise<Object>} - The response containing styles from the specified Figma file.
 */
const executeFunction = async ({ file_key }) => {
  const baseUrl = 'https://api.figma.com';
  const token = process.env.FIGMA_API_KEY;

  try {
    // Construct the URL for the request
    const url = `${baseUrl}/v1/files/${file_key}/styles`;

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
    console.error('Error listing styles in the Figma file:', error);
    return { error: 'An error occurred while listing styles in the Figma file.' };
  }
};

/**
 * Tool configuration for listing styles in a Figma file.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'list_styles_in_file',
      description: 'List styles in a specific Figma file.',
      parameters: {
        type: 'object',
        properties: {
          file_key: {
            type: 'string',
            description: 'The key of the Figma file to retrieve styles from.'
          }
        },
        required: ['file_key']
      }
    }
  }
};

export { apiTool };
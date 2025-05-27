/**
 * Function to retrieve a Figma file by its unique file key.
 *
 * @param {Object} args - Arguments for the file retrieval.
 * @param {string} args.file_key - The unique identifier of the Figma file.
 * @returns {Promise<Object>} - The result of the file retrieval.
 */
const executeFunction = async ({ file_key }) => {
  const baseUrl = 'https://api.figma.com/v1';
  const token = process.env.FIGMA_API_KEY;
  try {
    // Construct the URL for the request
    const url = `${baseUrl}/files/${file_key}`;

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
      throw new Error(errorData.err || 'An error occurred while retrieving the file.');
    }

    // Parse and return the response data
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error retrieving Figma file:', error);
    return { error: 'An error occurred while retrieving the Figma file.' };
  }
};

/**
 * Tool configuration for retrieving a Figma file.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_design',
      description: 'Retrieve a Figma file by its unique file key.',
      parameters: {
        type: 'object',
        properties: {
          file_key: {
            type: 'string',
            description: 'The unique identifier of the Figma file.'
          }
        },
        required: ['file_key']
      }
    }
  }
};

export { apiTool };
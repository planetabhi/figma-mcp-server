/**
 * Function to get the full document tree of a Figma file.
 *
 * @param {Object} args - Arguments for the file retrieval.
 * @param {string} args.file_key - The key of the Figma file to retrieve.
 * @returns {Promise<Object>} - The result of the file retrieval.
 */
const executeFunction = async ({ file_key }) => {
  const baseUrl = 'https://api.figma.com';
  const token = process.env.FIGMA_API_KEY;
  try {
    // Construct the URL for the request
    const url = `${baseUrl}/v1/files/${file_key}`;

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
      name: 'get_figma_file',
      description: 'Retrieve the full document tree of a Figma file.',
      parameters: {
        type: 'object',
        properties: {
          file_key: {
            type: 'string',
            description: 'The key of the Figma file to retrieve.'
          }
        },
        required: ['file_key']
      }
    }
  }
};

export { apiTool };
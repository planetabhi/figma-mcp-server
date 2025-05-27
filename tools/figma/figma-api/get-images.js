/**
 * Function to retrieve images associated with a Figma file.
 *
 * @param {Object} args - Arguments for the image retrieval.
 * @param {string} args.file_key - The Figma file key representing the specific Figma file from which images are to be retrieved.
 * @returns {Promise<Object>} - The result of the image retrieval.
 */
const executeFunction = async ({ file_key }) => {
  const baseUrl = 'https://api.figma.com/v1';
  const token = process.env.FIGMA_API_KEY;
  try {
    // Construct the URL for the image retrieval
    const url = `${baseUrl}/files/${file_key}/images`;

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
    console.error('Error retrieving images:', error);
    return { error: 'An error occurred while retrieving images.' };
  }
};

/**
 * Tool configuration for retrieving images from Figma.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_images',
      description: 'Retrieve images associated with a Figma file.',
      parameters: {
        type: 'object',
        properties: {
          file_key: {
            type: 'string',
            description: 'The Figma file key representing the specific Figma file from which images are to be retrieved.'
          }
        },
        required: ['file_key']
      }
    }
  }
};

export { apiTool };
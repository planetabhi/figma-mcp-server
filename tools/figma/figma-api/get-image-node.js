/**
 * Function to retrieve images from Figma using a specific file key and optional image IDs.
 *
 * @param {Object} args - Arguments for the image retrieval.
 * @param {string} args.file_key - The key of the Figma file.
 * @param {string} [args.ids] - A comma-separated list of specific image IDs to fetch.
 * @returns {Promise<Object>} - The result of the image retrieval.
 */
const executeFunction = async ({ file_key, ids }) => {
  const baseUrl = 'https://api.figma.com/v1';
  const token = process.env.FIGMA_API_KEY;
  try {
    // Construct the URL with the file key and optional image IDs
    const url = new URL(`${baseUrl}/images/${file_key}`);
    if (ids) {
      url.searchParams.append('ids', ids);
    }

    // Set up headers for the request
    const headers = {
      'X-Figma-Token': token
    };

    // Perform the fetch request
    const response = await fetch(url.toString(), {
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
    console.error('Error retrieving images from Figma:', error);
    return { error: 'An error occurred while retrieving images from Figma.' };
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
      name: 'get_image_node',
      description: 'Retrieve images from Figma using a specific file key and optional image IDs.',
      parameters: {
        type: 'object',
        properties: {
          file_key: {
            type: 'string',
            description: 'The key of the Figma file.'
          },
          ids: {
            type: 'string',
            description: 'A comma-separated list of specific image IDs to fetch.'
          }
        },
        required: ['file_key']
      }
    }
  }
};

export { apiTool };
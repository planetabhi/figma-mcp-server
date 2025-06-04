/**
 * Function to get image fills from a Figma file.
 *
 * @param {Object} args - Arguments for the image fills request.
 * @param {string} args.file_key - The key of the Figma file.
 * @param {string} [args.node_id] - The ID of the specific node to retrieve images for (optional).
 * @returns {Promise<Object>} - The URLs for rendered images of specific nodes.
 */
const executeFunction = async ({ file_key, node_id }) => {
  const baseUrl = 'https://api.figma.com';
  const token = process.env.FIGMA_API_KEY;
  try {
    // Construct the URL with the file key and optional node ID
    const url = new URL(`${baseUrl}/v1/images/${file_key}`);
    if (node_id) {
      url.searchParams.append('ids', node_id);
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
    console.error('Error getting image fills:', error);
    return { error: 'An error occurred while getting image fills.' };
  }
};

/**
 * Tool configuration for getting image fills from a Figma file.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_image_fills',
      description: 'Get image fills from a Figma file.',
      parameters: {
        type: 'object',
        properties: {
          file_key: {
            type: 'string',
            description: 'The key of the Figma file.'
          },
          node_id: {
            type: 'string',
            description: 'The ID of the specific node to retrieve images for.'
          }
        },
        required: ['file_key']
      }
    }
  }
};

export { apiTool };
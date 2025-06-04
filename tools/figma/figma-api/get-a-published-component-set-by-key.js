/**
 * Function to get metadata for a published component set by its key from Figma.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.key - The key of the component set to retrieve.
 * @returns {Promise<Object>} - The metadata for the component set.
 */
const executeFunction = async ({ key }) => {
  const baseUrl = 'https://api.figma.com';
  const token = process.env.FIGMA_API_KEY;
  try {
    // Construct the URL with the component set key
    const url = `${baseUrl}/v1/component_sets/${key}`;

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
    console.error('Error retrieving component set metadata:', error);
    return { error: 'An error occurred while retrieving component set metadata.' };
  }
};

/**
 * Tool configuration for retrieving component set metadata from Figma.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_component_set',
      description: 'Retrieve metadata for a published component set by its key.',
      parameters: {
        type: 'object',
        properties: {
          key: {
            type: 'string',
            description: 'The key of the component set to retrieve.'
          }
        },
        required: ['key']
      }
    }
  }
};

export { apiTool };
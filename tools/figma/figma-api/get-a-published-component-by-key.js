/**
 * Function to get metadata for a published component in Figma by its key.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.key - The key of the component to retrieve.
 * @returns {Promise<Object>} - The metadata of the published component.
 */
const executeFunction = async ({ key }) => {
  const baseUrl = 'https://api.figma.com/v1/components';
  const token = process.env.FIGMA_API_KEY;
  try {
    // Construct the URL with the component key
    const url = `${baseUrl}/${key}`;

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
    console.error('Error retrieving component metadata:', error);
    return { error: 'An error occurred while retrieving component metadata.' };
  }
};

/**
 * Tool configuration for retrieving component metadata from Figma.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_published_component_by_key',
      description: 'Retrieve metadata for a published component by its key.',
      parameters: {
        type: 'object',
        properties: {
          key: {
            type: 'string',
            description: 'The key of the component to retrieve.'
          }
        },
        required: ['key']
      }
    }
  }
};

export { apiTool };
/**
 * Function to get a published style from Figma by its key.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.key - The key of the published style to retrieve.
 * @returns {Promise<Object>} - The metadata for the published style.
 */
const executeFunction = async ({ key }) => {
  const baseUrl = 'https://api.figma.com';
  const token = process.env.FIGMA_API_KEY;
  try {
    // Construct the URL with the style key
    const url = `${baseUrl}/v1/styles/${key}`;

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
    console.error('Error retrieving published style:', error);
    return { error: 'An error occurred while retrieving the published style.' };
  }
};

/**
 * Tool configuration for getting a published style from Figma.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_published_style',
      description: 'Retrieve metadata for a published style by its key.',
      parameters: {
        type: 'object',
        properties: {
          key: {
            type: 'string',
            description: 'The key of the published style to retrieve.'
          }
        },
        required: ['key']
      }
    }
  }
};

export { apiTool };
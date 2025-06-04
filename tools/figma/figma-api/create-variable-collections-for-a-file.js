/**
 * Function to create variable collections for a Figma file.
 *
 * @param {Object} args - Arguments for creating variable collections.
 * @param {string} args.file_key - The key of the Figma file where the variable collection will be created.
 * @param {string} args.name - The name of the variable collection to create.
 * @returns {Promise<Object>} - The result of the variable collection creation.
 */
const executeFunction = async ({ file_key, name }) => {
  const baseUrl = 'https://api.figma.com';
  const token = process.env.FIGMA_API_KEY;
  try {
    // Construct the URL for the request
    const url = `${baseUrl}/v1/files/${file_key}/variables`;

    // Set up headers for the request
    const headers = {
      'X-Figma-Token': token,
      'Content-Type': 'application/json'
    };

    // Define the body of the request
    const body = JSON.stringify({
      variableCollections: [
        {
          action: 'CREATE',
          name: name
        }
      ]
    });

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body
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
    console.error('Error creating variable collections:', error);
    return { error: 'An error occurred while creating variable collections.' };
  }
};

/**
 * Tool configuration for creating variable collections in a Figma file.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_variable_collections',
      description: 'Create variable collections for a Figma file.',
      parameters: {
        type: 'object',
        properties: {
          file_key: {
            type: 'string',
            description: 'The key of the Figma file where the variable collection will be created.'
          },
          name: {
            type: 'string',
            description: 'The name of the variable collection to create.'
          }
        },
        required: ['file_key', 'name']
      }
    }
  }
};

export { apiTool };
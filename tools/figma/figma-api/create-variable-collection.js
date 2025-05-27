/**
 * Function to create a variable collection in Figma.
 *
 * @param {Object} args - Arguments for creating the variable collection.
 * @param {string} args.file_key - The key of the Figma file where the variable collection will be created.
 * @param {string} args.name - The name of the new variable collection to be created.
 * @returns {Promise<Object>} - The result of the variable collection creation.
 */
const executeFunction = async ({ file_key, name }) => {
  const baseUrl = 'https://api.figma.com/v1';
  const token = process.env.FIGMA_API_KEY;

  try {
    // Construct the URL for the request
    const url = `${baseUrl}/files/${file_key}/variables`;

    // Set up headers for the request
    const headers = {
      'X-Figma-Token': token,
      'Content-Type': 'application/json'
    };

    // Create the request body
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
    console.error('Error creating variable collection:', error);
    return { error: 'An error occurred while creating the variable collection.' };
  }
};

/**
 * Tool configuration for creating a variable collection in Figma.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_variable_collection',
      description: 'Create a new variable collection in Figma.',
      parameters: {
        type: 'object',
        properties: {
          file_key: {
            type: 'string',
            description: 'The key of the Figma file where the variable collection will be created.'
          },
          name: {
            type: 'string',
            description: 'The name of the new variable collection to be created.'
          }
        },
        required: ['file_key', 'name']
      }
    }
  }
};

export { apiTool };
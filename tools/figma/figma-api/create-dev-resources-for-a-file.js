/**
 * Function to create development resources for a Figma file.
 *
 * @param {Object} args - Arguments for creating development resources.
 * @param {string} args.file_key - The key of the Figma file.
 * @param {string} args.node_id - The node ID for the resource.
 * @param {string} args.name - The name of the development resource.
 * @param {string} args.url - The URL for the development resource.
 * @returns {Promise<Object>} - The result of the resource creation.
 */
const executeFunction = async ({ file_key, node_id, name, url }) => {
  const baseUrl = 'https://api.figma.com';
  const token = process.env.FIGMA_API_KEY;
  try {
    // Construct the URL for the API request
    const url = `${baseUrl}/v1/files/${file_key}/dev_resources`;

    // Set up headers for the request
    const headers = {
      'X-Figma-Token': token,
      'Content-Type': 'application/json'
    };

    // Create the body for the request
    const body = JSON.stringify({
      dev_resources: [
        {
          name,
          url,
          file_key,
          node_id
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
    console.error('Error creating development resources:', error);
    return { error: 'An error occurred while creating development resources.' };
  }
};

/**
 * Tool configuration for creating development resources for a Figma file.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_dev_resources',
      description: 'Create development resources for a Figma file.',
      parameters: {
        type: 'object',
        properties: {
          file_key: {
            type: 'string',
            description: 'The key of the Figma file.'
          },
          node_id: {
            type: 'string',
            description: 'The node ID for the resource.'
          },
          name: {
            type: 'string',
            description: 'The name of the development resource.'
          },
          url: {
            type: 'string',
            description: 'The URL for the development resource.'
          }
        },
        required: ['file_key', 'node_id', 'name', 'url']
      }
    }
  }
};

export { apiTool };
/**
 * Function to post a new development resource to Figma.
 *
 * @param {Object} args - Arguments for the new development resource.
 * @param {string} args.name - The name of the resource.
 * @param {string} args.url - The URL of the resource.
 * @param {string} args.file_key - The file key of the resource.
 * @param {string} args.node_id - The node ID of the resource.
 * @returns {Promise<Object>} - The result of the resource creation.
 */
const executeFunction = async ({ name, url, file_key, node_id }) => {
  const baseUrl = 'https://api.figma.com/v1';
  const token = process.env.FIGMA_API_KEY;
  
  try {
    // Construct the request body
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

    // Set up headers for the request
    const headers = {
      'X-Figma-Token': token,
      'Content-Type': 'application/json'
    };

    // Perform the fetch request
    const response = await fetch(`${baseUrl}/dev_resources`, {
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
    console.error('Error posting development resource:', error);
    return { error: 'An error occurred while posting the development resource.' };
  }
};

/**
 * Tool configuration for posting a new development resource to Figma.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'post_dev_resource',
      description: 'Post a new development resource to Figma.',
      parameters: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'The name of the resource.'
          },
          url: {
            type: 'string',
            description: 'The URL of the resource.'
          },
          file_key: {
            type: 'string',
            description: 'The file key of the resource.'
          },
          node_id: {
            type: 'string',
            description: 'The node ID of the resource.'
          }
        },
        required: ['name', 'url', 'file_key', 'node_id']
      }
    }
  }
};

export { apiTool };
/**
 * Function to retrieve information about specific nodes in a Figma file.
 *
 * @param {Object} args - Arguments for the node retrieval.
 * @param {string} args.file_key - The key of the Figma file.
 * @param {string} args.node_id - The IDs of the nodes to retrieve, comma-separated.
 * @returns {Promise<Object>} - The result of the node retrieval.
 */
const executeFunction = async ({ file_key, node_id }) => {
  const baseUrl = 'https://api.figma.com/v1';
  const token = process.env.FIGMA_API_KEY;

  try {
    // Construct the URL for the API request
    const url = `${baseUrl}/files/${file_key}/nodes?ids=${node_id}`;

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
    console.error('Error retrieving node information:', error);
    return { error: 'An error occurred while retrieving node information.' };
  }
};

/**
 * Tool configuration for retrieving node information from a Figma file.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_design_node',
      description: 'Retrieve information about specific nodes in a Figma file.',
      parameters: {
        type: 'object',
        properties: {
          file_key: {
            type: 'string',
            description: 'The key of the Figma file.'
          },
          node_id: {
            type: 'string',
            description: 'The IDs of the nodes to retrieve, comma-separated.'
          }
        },
        required: ['file_key', 'node_id']
      }
    }
  }
};

export { apiTool };
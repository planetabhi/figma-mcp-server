/**
 * Function to list files in a specified Figma project.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.project_id - The ID of the project to list files from.
 * @returns {Promise<Object>} - The result of the files listing.
 */
const executeFunction = async ({ project_id }) => {
  const baseUrl = 'https://api.figma.com';
  const token = process.env.FIGMA_API_KEY;

  try {
    // Construct the URL for the request
    const url = `${baseUrl}/v1/projects/${project_id}/files`;

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
    console.error('Error listing files in project:', error);
    return { error: 'An error occurred while listing files in the project.' };
  }
};

/**
 * Tool configuration for listing files in a Figma project.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'list_files_in_project',
      description: 'List files in a specified Figma project.',
      parameters: {
        type: 'object',
        properties: {
          project_id: {
            type: 'string',
            description: 'The ID of the project to list files from.'
          }
        },
        required: ['project_id']
      }
    }
  }
};

export { apiTool };
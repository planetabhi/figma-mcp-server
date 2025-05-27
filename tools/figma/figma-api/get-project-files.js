/**
 * Function to get project files from Figma.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.project_id - The ID of the project to retrieve files from.
 * @returns {Promise<Object>} - The list of files associated with the specified project.
 */
const executeFunction = async ({ project_id }) => {
  const baseUrl = 'https://api.figma.com/v1';
  const token = process.env.FIGMA_API_KEY;
  try {
    // Construct the URL for the request
    const url = `${baseUrl}/projects/${project_id}/files`;

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
    console.error('Error retrieving project files:', error);
    return { error: 'An error occurred while retrieving project files.' };
  }
};

/**
 * Tool configuration for getting project files from Figma.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_project_files',
      description: 'Retrieve files associated with a specific project in Figma.',
      parameters: {
        type: 'object',
        properties: {
          project_id: {
            type: 'string',
            description: 'The ID of the project to retrieve files from.'
          }
        },
        required: ['project_id']
      }
    }
  }
};

export { apiTool };
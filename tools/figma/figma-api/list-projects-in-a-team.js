/**
 * Function to list projects in a specified team on Figma.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.team_id - The ID of the team for which to list projects.
 * @returns {Promise<Object>} - The list of projects within the specified team.
 */
const executeFunction = async ({ team_id }) => {
  const baseUrl = 'https://api.figma.com';
  const token = process.env.FIGMA_API_KEY;
  try {
    // Construct the URL for the request
    const url = `${baseUrl}/v1/teams/${team_id}/projects`;

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
    console.error('Error listing projects:', error);
    return { error: 'An error occurred while listing projects.' };
  }
};

/**
 * Tool configuration for listing projects in a team on Figma.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'list_projects_in_team',
      description: 'List all projects within a specified team on Figma.',
      parameters: {
        type: 'object',
        properties: {
          team_id: {
            type: 'string',
            description: 'The ID of the team for which to list projects.'
          }
        },
        required: ['team_id']
      }
    }
  }
};

export { apiTool };
/**
 * Function to get projects associated with a specific team in Figma.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.team_id - The ID of the team whose projects are to be retrieved.
 * @returns {Promise<Object>} - The list of projects associated with the team.
 */
const executeFunction = async ({ team_id }) => {
  const baseUrl = 'https://api.figma.com/v1';
  const token = process.env.FIGMA_API_KEY;
  try {
    // Construct the URL for the request
    const url = `${baseUrl}/teams/${team_id}/projects`;

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
    console.error('Error retrieving team projects:', error);
    return { error: 'An error occurred while retrieving team projects.' };
  }
};

/**
 * Tool configuration for getting team projects in Figma.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_team_projects',
      description: 'Retrieve projects associated with a specific team in Figma.',
      parameters: {
        type: 'object',
        properties: {
          team_id: {
            type: 'string',
            description: 'The ID of the team whose projects are to be retrieved.'
          }
        },
        required: ['team_id']
      }
    }
  }
};

export { apiTool };
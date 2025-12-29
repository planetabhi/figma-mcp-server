import { ApiTool } from "../../../lib/tools.ts";
const executeFunction = async ({ team_id }: any) => {
  const baseUrl = 'https://api.figma.com';
  const token = process.env.FIGMA_API_KEY || '';
  try {
    const url = `${baseUrl}/v1/teams/${team_id}/projects`;

    const headers = {
      'X-Figma-Token': token
    };

    const response = await fetch(url, {
      method: 'GET',
      headers
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error listing projects:', error);
    return { error: 'An error occurred while listing projects.' };
  }
};

const apiTool: ApiTool = {
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
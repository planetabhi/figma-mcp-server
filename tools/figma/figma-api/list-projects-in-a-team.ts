import { ApiTool, figmaRequest } from "../../../lib/tools.ts";

const executeFunction = async ({ team_id }: any) => {
  return figmaRequest(`/v1/teams/${team_id}/projects`);
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
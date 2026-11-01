import { ApiTool, figmaRequest } from "../../../lib/tools.ts";

const executeFunction = async ({ team_id }: any) => {
  return figmaRequest(`/v1/teams/${team_id}`);
};

const apiTool: ApiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_team',
      description: 'Get metadata for a team the caller can access. Available to private OAuth apps on Professional, Organization, and Enterprise plans, and to plan access tokens on Organization and Enterprise plans.',
      parameters: {
        type: 'object',
        properties: {
          team_id: { type: 'string', description: 'The ID of the team.' }
        },
        required: ['team_id']
      }
    }
  }
};

export { apiTool };

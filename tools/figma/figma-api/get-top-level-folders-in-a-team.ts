import { ApiTool, figmaRequest } from "../../../lib/tools.ts";

const executeFunction = async ({ team_id }: any) => {
  return figmaRequest(`/v2/teams/${team_id}/folders`);
};

const apiTool: ApiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_team_folders',
      description: 'Get the top-level folders (previously called projects) within a specified team.',
      parameters: {
        type: 'object',
        properties: {
          team_id: {
            type: 'string',
            description: 'The ID of the team to list folders from.'
          }
        },
        required: ['team_id']
      }
    }
  }
};

export { apiTool };

import { ApiTool, figmaRequest } from "../../../lib/tools.ts";

const executeFunction = async ({ team_id, name, sharing_audience_control }: any) => {
  return figmaRequest(`/v1/teams/${team_id}/folders`, {
    method: 'POST',
    body: { name, sharing_audience_control }
  });
};

const apiTool: ApiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_folder',
      description: 'Create a top-level folder in a team. The team must belong to the Enterprise plan associated with the private OAuth app. Enterprise plans only.',
      parameters: {
        type: 'object',
        properties: {
          team_id: { type: 'string', description: 'The ID of the team in which to create the folder.' },
          name: { type: 'string', description: 'The name of the folder.' },
          sharing_audience_control: { type: 'string', description: 'The audience that can access the folder: plan_view, plan_edit, invite_only, workspace_view, or workspace_edit. Workspace audiences require the team to belong to a workspace.' }
        },
        required: ['team_id', 'name', 'sharing_audience_control']
      }
    }
  }
};

export { apiTool };

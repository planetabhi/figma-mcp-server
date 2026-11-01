import { ApiTool, figmaRequest } from "../../../lib/tools.ts";

const executeFunction = async ({ name, description, sharing_audience_control, org_discoverability, workspace_id }: any) => {
  return figmaRequest(`/v1/teams`, {
    method: 'POST',
    body: { name, description, sharing_audience_control, org_discoverability, workspace_id }
  });
};

const apiTool: ApiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_team',
      description: 'Create a team in the Enterprise plan associated with a private OAuth app. The authenticated user becomes the team owner. Enterprise plans only.',
      parameters: {
        type: 'object',
        properties: {
          name: { type: 'string', description: 'The name of the team.' },
          description: { type: 'string', description: 'Optional description of the team.' },
          sharing_audience_control: { type: 'string', description: 'The audience that can discover and join the team: org_view, org_edit, invite_only, workspace_view, or workspace_edit. Workspace audiences require workspace_id.' },
          org_discoverability: { type: 'string', description: 'Whether organization members can discover an invite-only team: hidden or discoverable. Required for invite_only and not accepted for other audiences.' },
          workspace_id: { type: 'string', description: 'The workspace in which to create the team. Required for workspace audiences.' }
        },
        required: ['name', 'sharing_audience_control']
      }
    }
  }
};

export { apiTool };

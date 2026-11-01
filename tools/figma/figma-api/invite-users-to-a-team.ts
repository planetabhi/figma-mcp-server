import { ApiTool, figmaRequest } from "../../../lib/tools.ts";

const executeFunction = async ({ team_id, emails, role }: any) => {
  return figmaRequest(`/v1/teams/${team_id}/invites`, {
    method: 'POST',
    body: { emails, role }
  });
};

const apiTool: ApiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'invite_team_members',
      description: 'Invite users to a team with the requested role. Each email is processed independently; per-address failures are returned in `errors` with HTTP 200, so always check `errors`. Existing members keep their current role when it is higher. Enterprise plans only.',
      parameters: {
        type: 'object',
        properties: {
          team_id: { type: 'string', description: 'The ID of the team to invite users to.' },
          emails: { type: 'array', items: { type: 'string' }, description: 'The email addresses to invite (1 to 99).' },
          role: { type: 'string', description: 'The role to grant each invited member: viewer, editor, or admin. Existing roles are never downgraded.' }
        },
        required: ['team_id', 'emails', 'role']
      }
    }
  }
};

export { apiTool };

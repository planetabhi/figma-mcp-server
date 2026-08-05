import { ApiTool, figmaRequest } from "../../../lib/tools.ts";

const executeFunction = async ({ team_id, page_size, after, before }: any) => {
  return figmaRequest(`/v1/teams/${team_id}/components`, { query: { page_size, after, before } });
};

const apiTool: ApiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_team_components',
      description: 'Get a paginated list of published components within a team library.',
      parameters: {
        type: 'object',
        properties: {
          team_id: { type: 'string', description: 'The ID of the team to list components from.' },
          page_size: { type: 'number', description: 'Number of items per page. Defaults to 30, max 1000.' },
          after: { type: 'number', description: 'Cursor to start retrieving components after. Exclusive with before.' },
          before: { type: 'number', description: 'Cursor to start retrieving components before. Exclusive with after.' }
        },
        required: ['team_id']
      }
    }
  }
};

export { apiTool };

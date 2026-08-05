import { ApiTool, figmaRequest } from "../../../lib/tools.ts";

const executeFunction = async ({ team_id, page_size, after, before }: any) => {
  return figmaRequest(`/v1/teams/${team_id}/component_sets`, { query: { page_size, after, before } });
};

const apiTool: ApiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_team_component_sets',
      description: 'Get a paginated list of published component sets within a team library.',
      parameters: {
        type: 'object',
        properties: {
          team_id: { type: 'string', description: 'The ID of the team to list component sets from.' },
          page_size: { type: 'number', description: 'Number of items per page. Defaults to 30.' },
          after: { type: 'number', description: 'Cursor to start retrieving component sets after. Exclusive with before.' },
          before: { type: 'number', description: 'Cursor to start retrieving component sets before. Exclusive with after.' }
        },
        required: ['team_id']
      }
    }
  }
};

export { apiTool };

import { ApiTool, figmaRequest } from "../../../lib/tools.ts";

const executeFunction = async ({ file_key, group_by, cursor, start_date, end_date }: any) => {
  return figmaRequest(`/v1/analytics/libraries/${file_key}/component/actions`, {
    query: { group_by, cursor, start_date, end_date }
  });
};

const apiTool: ApiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_library_component_actions',
      description: 'Get library analytics component action data (detachments, insertions) broken down by the requested dimension.',
      parameters: {
        type: 'object',
        properties: {
          file_key: { type: 'string', description: 'File key of the library to fetch analytics for.' },
          group_by: { type: 'string', description: 'Dimension to group by: "component" or "team".' },
          cursor: { type: 'string', description: 'Pagination cursor from a previous call.' },
          start_date: { type: 'string', description: 'ISO 8601 date (YYYY-MM-DD) of the earliest week. Defaults to one year prior.' },
          end_date: { type: 'string', description: 'ISO 8601 date (YYYY-MM-DD) of the latest week. Defaults to the latest computed week.' }
        },
        required: ['file_key', 'group_by']
      }
    }
  }
};

export { apiTool };

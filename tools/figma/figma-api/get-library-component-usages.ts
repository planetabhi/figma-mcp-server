import { ApiTool, figmaRequest } from "../../../lib/tools.ts";

const executeFunction = async ({ file_key, group_by, cursor }: any) => {
  return figmaRequest(`/v1/analytics/libraries/${file_key}/component/usages`, {
    query: { group_by, cursor }
  });
};

const apiTool: ApiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_library_component_usages',
      description: 'Get library analytics component usage data broken down by the requested dimension.',
      parameters: {
        type: 'object',
        properties: {
          file_key: { type: 'string', description: 'File key of the library to fetch analytics for.' },
          group_by: { type: 'string', description: 'Dimension to group by: "component" or "file".' },
          cursor: { type: 'string', description: 'Pagination cursor from a previous call.' }
        },
        required: ['file_key', 'group_by']
      }
    }
  }
};

export { apiTool };

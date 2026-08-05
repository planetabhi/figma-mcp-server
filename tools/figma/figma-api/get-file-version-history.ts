import { ApiTool, figmaRequest } from "../../../lib/tools.ts";

const executeFunction = async ({ file_key, page_size, before, after }: any) => {
  return figmaRequest(`/v1/files/${file_key}/versions`, {
    query: { page_size, before, after }
  });
};

const apiTool: ApiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_file_version_history',
      description: 'Retrieve the paginated version history of a Figma file.',
      parameters: {
        type: 'object',
        properties: {
          file_key: { type: 'string', description: 'The key of the Figma file (or branch key).' },
          page_size: { type: 'number', description: 'Number of items per page. Defaults to 30, max 50.' },
          before: { type: 'number', description: 'A version ID to get versions before, for pagination.' },
          after: { type: 'number', description: 'A version ID to get versions after, for pagination.' }
        },
        required: ['file_key']
      }
    }
  }
};

export { apiTool };
import { ApiTool, figmaRequest } from "../../../lib/tools.ts";

const executeFunction = async ({ file_key, comment_id, cursor }: any) => {
  return figmaRequest(`/v1/files/${file_key}/comments/${comment_id}/reactions`, { query: { cursor } });
};

const apiTool: ApiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_comment_reactions',
      description: 'Get a paginated list of reactions left on a comment.',
      parameters: {
        type: 'object',
        properties: {
          file_key: { type: 'string', description: 'The key of the Figma file (or branch key).' },
          comment_id: { type: 'string', description: 'The ID of the comment to get reactions from.' },
          cursor: { type: 'string', description: 'Pagination cursor from a previous response.' }
        },
        required: ['file_key', 'comment_id']
      }
    }
  }
};

export { apiTool };

import { ApiTool, figmaRequest } from "../../../lib/tools.ts";

const executeFunction = async ({ file_key, comment_id, emoji }: any) => {
  return figmaRequest(`/v1/files/${file_key}/comments/${comment_id}/reactions`, {
    method: 'DELETE',
    query: { emoji }
  });
};

const apiTool: ApiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'delete_comment_reaction',
      description: 'Delete a reaction from a comment. Only the author of the reaction can delete it.',
      parameters: {
        type: 'object',
        properties: {
          file_key: { type: 'string', description: 'The key of the Figma file (or branch key).' },
          comment_id: { type: 'string', description: 'The ID of the comment to remove the reaction from.' },
          emoji: { type: 'string', description: 'Emoji shortcode of the reaction to remove, e.g. ":heart:".' }
        },
        required: ['file_key', 'comment_id', 'emoji']
      }
    }
  }
};

export { apiTool };

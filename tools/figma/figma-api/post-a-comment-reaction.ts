import { ApiTool, figmaRequest } from "../../../lib/tools.ts";

const executeFunction = async ({ file_key, comment_id, emoji }: any) => {
  return figmaRequest(`/v1/files/${file_key}/comments/${comment_id}/reactions`, {
    method: 'POST',
    body: { emoji }
  });
};

const apiTool: ApiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'post_comment_reaction',
      description: 'Add a reaction to a comment on a Figma file.',
      parameters: {
        type: 'object',
        properties: {
          file_key: { type: 'string', description: 'The key of the Figma file (or branch key).' },
          comment_id: { type: 'string', description: 'The ID of the comment to react to.' },
          emoji: { type: 'string', description: 'Emoji shortcode for the reaction, e.g. ":heart:" or ":+1::skin-tone-2:".' }
        },
        required: ['file_key', 'comment_id', 'emoji']
      }
    }
  }
};

export { apiTool };

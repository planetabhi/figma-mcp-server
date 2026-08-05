import { ApiTool, figmaRequest } from "../../../lib/tools.ts";

const executeFunction = async ({ file_key, comment_id }: any) => {
  return figmaRequest(`/v1/files/${file_key}/comments/${comment_id}`, { method: 'DELETE' });
};

const apiTool: ApiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'delete_comment',
      description: 'Delete a comment from a Figma file. Only the author of the comment can delete it.',
      parameters: {
        type: 'object',
        properties: {
          file_key: { type: 'string', description: 'The key of the Figma file (or branch key).' },
          comment_id: { type: 'string', description: 'The ID of the comment to delete.' }
        },
        required: ['file_key', 'comment_id']
      }
    }
  }
};

export { apiTool };

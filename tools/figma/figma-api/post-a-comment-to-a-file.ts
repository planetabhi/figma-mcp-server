import { ApiTool, figmaRequest } from "../../../lib/tools.ts";

const executeFunction = async ({ file_key, message, client_meta = {} }: any) => {
  return figmaRequest(`/v1/files/${file_key}/comments`, {
    method: 'POST',
    body: { message, client_meta }
  });
};

const apiTool: ApiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'post_comment',
      description: 'Post a comment to a Figma file.',
      parameters: {
        type: 'object',
        properties: {
          file_key: {
            type: 'string',
            description: 'The key of the Figma file to comment on.'
          },
          message: {
            type: 'string',
            description: 'The message of the comment.'
          },
          client_meta: {
            type: 'object',
            properties: {
              x: {
                type: 'number',
                description: 'The x-coordinate for the comment.'
              },
              y: {
                type: 'number',
                description: 'The y-coordinate for the comment.'
              },
              node_id: {
                type: 'string',
                description: 'The node ID for the comment.'
              }
            },
            description: 'Optional metadata for the comment\'s location.'
          }
        },
        required: ['file_key', 'message']
      }
    }
  }
};

export { apiTool };

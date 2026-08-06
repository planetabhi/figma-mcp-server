import { ApiTool, figmaRequest } from "../../../lib/tools.ts";

const executeFunction = async ({ file_key, message, client_meta = {} }: any) => {
  const { node_id, x, y } = client_meta;
  let normalizedClientMeta: Record<string, unknown> | undefined;
  if (node_id != null) {
    normalizedClientMeta = { node_id, node_offset: { x: x ?? 0, y: y ?? 0 } };
  } else if (x != null || y != null) {
    normalizedClientMeta = { x: x ?? 0, y: y ?? 0 };
  }

  return figmaRequest(`/v1/files/${file_key}/comments`, {
    method: 'POST',
    body: normalizedClientMeta ? { message, client_meta: normalizedClientMeta } : { message }
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
            description: 'Optional location for the comment. Provide only x and y to pin at an absolute canvas coordinate, or provide node_id together with x and y to pin relative to a node. When node_id is set, x and y are treated as the offset within that node.'
          }
        },
        required: ['file_key', 'message']
      }
    }
  }
};

export { apiTool };

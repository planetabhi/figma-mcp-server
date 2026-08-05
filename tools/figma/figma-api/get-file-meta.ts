import { ApiTool, figmaRequest } from "../../../lib/tools.ts";

const executeFunction = async ({ file_key }: any) => {
  return figmaRequest(`/v1/files/${file_key}/meta`);
};

const apiTool: ApiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_file_meta',
      description: 'Get metadata for a Figma file (name, folder, last touched, creator, editor type, role, link access, version).',
      parameters: {
        type: 'object',
        properties: {
          file_key: { type: 'string', description: 'The key of the Figma file (or branch key).' }
        },
        required: ['file_key']
      }
    }
  }
};

export { apiTool };

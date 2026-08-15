import { ApiTool, figmaRequest } from "../../../lib/tools.ts";

const executeFunction = async ({ folder_id }: any) => {
  return figmaRequest(`/v2/folders/${folder_id}/meta`);
};

const apiTool: ApiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_folder_meta',
      description: 'Get metadata for a folder (name, thumbnail, file count, created/updated timestamps) without enumerating its files.',
      parameters: {
        type: 'object',
        properties: {
          folder_id: {
            type: 'string',
            description: 'The ID of the folder to get metadata for.'
          }
        },
        required: ['folder_id']
      }
    }
  }
};

export { apiTool };

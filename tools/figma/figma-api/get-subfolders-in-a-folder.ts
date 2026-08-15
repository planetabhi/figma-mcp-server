import { ApiTool, figmaRequest } from "../../../lib/tools.ts";

const executeFunction = async ({ folder_id }: any) => {
  return figmaRequest(`/v2/folders/${folder_id}/folders`);
};

const apiTool: ApiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_folder_subfolders',
      description: 'Get the direct subfolders within a specified folder.',
      parameters: {
        type: 'object',
        properties: {
          folder_id: {
            type: 'string',
            description: 'The ID of the parent folder to list subfolders from.'
          }
        },
        required: ['folder_id']
      }
    }
  }
};

export { apiTool };

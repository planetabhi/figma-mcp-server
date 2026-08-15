import { ApiTool, figmaRequest } from "../../../lib/tools.ts";

const executeFunction = async ({ folder_id, branch_data }: any) => {
  return figmaRequest(`/v2/folders/${folder_id}/files`, {
    query: { branch_data }
  });
};

const apiTool: ApiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_folder_files',
      description: 'Get the files directly within a specified folder.',
      parameters: {
        type: 'object',
        properties: {
          folder_id: {
            type: 'string',
            description: 'The ID of the folder to list files from.'
          },
          branch_data: {
            type: 'boolean',
            description: 'Returns branch metadata for each main file with a branch inside the folder. Defaults to false.'
          }
        },
        required: ['folder_id']
      }
    }
  }
};

export { apiTool };

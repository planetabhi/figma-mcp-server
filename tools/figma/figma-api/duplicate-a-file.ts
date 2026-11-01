import { ApiTool, figmaRequest } from "../../../lib/tools.ts";

const executeFunction = async ({ file_key, folder_id }: any) => {
  return figmaRequest(`/v1/files/${file_key}/duplicate`, {
    method: 'POST',
    body: { folder_id }
  });
};

const apiTool: ApiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'duplicate_file',
      description: 'Duplicate a main file or branch into the specified folder as a new standalone file. The copy uses the source\'s latest saved checkpoint and may omit recent unsaved changes. Enterprise plans only.',
      parameters: {
        type: 'object',
        properties: {
          file_key: { type: 'string', description: 'The key of the main file or branch to duplicate.' },
          folder_id: { type: 'string', description: 'The ID of the folder to create the duplicated file in.' }
        },
        required: ['file_key', 'folder_id']
      }
    }
  }
};

export { apiTool };

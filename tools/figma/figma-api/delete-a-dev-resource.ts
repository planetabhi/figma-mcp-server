import { ApiTool, figmaRequest } from "../../../lib/tools.ts";

const executeFunction = async ({ file_key, dev_resource_id }: any) => {
  return figmaRequest(`/v1/files/${file_key}/dev_resources/${dev_resource_id}`, { method: 'DELETE' });
};

const apiTool: ApiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'delete_dev_resource',
      description: 'Delete a dev resource from a file.',
      parameters: {
        type: 'object',
        properties: {
          file_key: { type: 'string', description: 'The main file key the dev resource belongs to (not a branch key).' },
          dev_resource_id: { type: 'string', description: 'The ID of the dev resource to delete.' }
        },
        required: ['file_key', 'dev_resource_id']
      }
    }
  }
};

export { apiTool };

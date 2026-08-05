import { ApiTool, figmaRequest } from "../../../lib/tools.ts";

const executeFunction = async ({ project_id }: any) => {
  return figmaRequest(`/v1/projects/${project_id}/meta`);
};

const apiTool: ApiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_project_meta',
      description: 'Get metadata for a project (name, thumbnail, file count, created/updated timestamps).',
      parameters: {
        type: 'object',
        properties: {
          project_id: { type: 'string', description: 'The ID of the project.' }
        },
        required: ['project_id']
      }
    }
  }
};

export { apiTool };

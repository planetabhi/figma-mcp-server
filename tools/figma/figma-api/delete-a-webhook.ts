import { ApiTool, figmaRequest } from "../../../lib/tools.ts";

const executeFunction = async ({ webhook_id }: any) => {
  return figmaRequest(`/v2/webhooks/${webhook_id}`, { method: 'DELETE' });
};

const apiTool: ApiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'delete_webhook',
      description: 'Delete a webhook by ID. This cannot be reversed.',
      parameters: {
        type: 'object',
        properties: {
          webhook_id: { type: 'string', description: 'The ID of the webhook to delete.' }
        },
        required: ['webhook_id']
      }
    }
  }
};

export { apiTool };

import { ApiTool, figmaRequest } from "../../../lib/tools.ts";

const executeFunction = async ({ webhook_id }: any) => {
  return figmaRequest(`/v2/webhooks/${webhook_id}`);
};

const apiTool: ApiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_webhook',
      description: 'Get a webhook by its ID.',
      parameters: {
        type: 'object',
        properties: {
          webhook_id: { type: 'string', description: 'The ID of the webhook to get.' }
        },
        required: ['webhook_id']
      }
    }
  }
};

export { apiTool };

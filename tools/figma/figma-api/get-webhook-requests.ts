import { ApiTool, figmaRequest } from "../../../lib/tools.ts";

const executeFunction = async ({ webhook_id }: any) => {
  return figmaRequest(`/v2/webhooks/${webhook_id}/requests`);
};

const apiTool: ApiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_webhook_requests',
      description: 'Get webhook requests sent within the last week for a given webhook. Useful for debugging.',
      parameters: {
        type: 'object',
        properties: {
          webhook_id: { type: 'string', description: 'The ID of the webhook to see requests from.' }
        },
        required: ['webhook_id']
      }
    }
  }
};

export { apiTool };

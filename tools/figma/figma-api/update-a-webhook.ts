import { ApiTool, figmaRequest } from "../../../lib/tools.ts";

const executeFunction = async ({ webhook_id, event_type, endpoint, passcode, status, description }: any) => {
  return figmaRequest(`/v2/webhooks/${webhook_id}`, {
    method: 'PUT',
    body: { event_type, endpoint, passcode, status, description }
  });
};

const apiTool: ApiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'update_webhook',
      description: 'Update an existing webhook by ID.',
      parameters: {
        type: 'object',
        properties: {
          webhook_id: { type: 'string', description: 'The ID of the webhook to update.' },
          event_type: { type: 'string', description: 'Event to subscribe to: PING, FILE_UPDATE, FILE_VERSION_UPDATE, FILE_DELETE, LIBRARY_PUBLISH, FILE_COMMENT, or DEV_MODE_STATUS_UPDATE.' },
          endpoint: { type: 'string', description: 'HTTP endpoint that receives the POST when the event triggers. Max 2048 chars.' },
          passcode: { type: 'string', description: 'String passed back to your endpoint to verify Figma is the caller. Max 100 chars.' },
          status: { type: 'string', description: 'Webhook status: ACTIVE or PAUSED.' },
          description: { type: 'string', description: 'Optional name/description for the webhook. Max 150 chars.' }
        },
        required: ['webhook_id', 'event_type', 'endpoint', 'passcode']
      }
    }
  }
};

export { apiTool };

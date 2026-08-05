import { ApiTool, figmaRequest } from "../../../lib/tools.ts";

const executeFunction = async ({ event_type, context, context_id, endpoint, passcode, status, description }: any) => {
  return figmaRequest(`/v2/webhooks`, {
    method: 'POST',
    body: { event_type, context, context_id, endpoint, passcode, status, description }
  });
};

const apiTool: ApiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_webhook',
      description: 'Create a webhook that calls the given endpoint when the event triggers. A PING event is sent on creation unless status is PAUSED.',
      parameters: {
        type: 'object',
        properties: {
          event_type: { type: 'string', description: 'Event to subscribe to: PING, FILE_UPDATE, FILE_VERSION_UPDATE, FILE_DELETE, LIBRARY_PUBLISH, FILE_COMMENT, or DEV_MODE_STATUS_UPDATE.' },
          context: { type: 'string', description: 'Context to attach the webhook to: "team", "project", or "file".' },
          context_id: { type: 'string', description: 'The id of the context to receive updates about.' },
          endpoint: { type: 'string', description: 'HTTP endpoint that receives the POST when the event triggers. Max 2048 chars.' },
          passcode: { type: 'string', description: 'String passed back to your endpoint to verify Figma is the caller. Max 100 chars.' },
          status: { type: 'string', description: 'Optional initial status: ACTIVE or PAUSED.' },
          description: { type: 'string', description: 'Optional name/description for the webhook. Max 150 chars.' }
        },
        required: ['event_type', 'context', 'context_id', 'endpoint', 'passcode']
      }
    }
  }
};

export { apiTool };

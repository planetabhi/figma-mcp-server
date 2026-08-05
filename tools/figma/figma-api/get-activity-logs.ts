import { ApiTool, figmaRequest } from "../../../lib/tools.ts";

const executeFunction = async ({ events, start_time, end_time, limit, order }: any) => {
  return figmaRequest(`/v1/activity_logs`, { query: { events, start_time, end_time, limit, order } });
};

const apiTool: ApiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_activity_logs',
      description: 'Get activity log events for the organization. Requires an organization admin plan access token (Enterprise).',
      parameters: {
        type: 'object',
        properties: {
          events: { type: 'string', description: 'Comma-separated event type(s) to include. All events by default.' },
          start_time: { type: 'number', description: 'Unix timestamp of the least recent event to include. Defaults to one year ago.' },
          end_time: { type: 'number', description: 'Unix timestamp of the most recent event to include. Defaults to now.' },
          limit: { type: 'number', description: 'Maximum number of events to return. Defaults to 1000.' },
          order: { type: 'string', description: 'Event order by timestamp: "asc" (default) or "desc".' }
        },
        required: []
      }
    }
  }
};

export { apiTool };

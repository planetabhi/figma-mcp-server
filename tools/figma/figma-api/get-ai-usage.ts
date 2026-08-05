import { ApiTool, figmaRequest } from "../../../lib/tools.ts";

const executeFunction = async ({ start_date, end_date, user_email, limit, cursor }: any) => {
  return figmaRequest(`/v1/ai_usage/daily`, { query: { start_date, end_date, user_email, limit, cursor } });
};

const apiTool: ApiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_ai_usage_daily',
      description: 'Get per-user, per-day AI credit usage for the plan. Requires a plan access token with org:ai_metering_usage_read (Enterprise).',
      parameters: {
        type: 'object',
        properties: {
          start_date: { type: 'string', description: 'First day to include (inclusive) as YYYY-MM-DD (UTC). Must be on/after 2025-12-01.' },
          end_date: { type: 'string', description: 'Last day to include (inclusive) as YYYY-MM-DD (UTC).' },
          user_email: { type: 'string', description: 'Restrict results to a single Figma user by email.' },
          limit: { type: 'number', description: 'Maximum rows to return (1-1000, default 1000).' },
          cursor: { type: 'string', description: 'Pagination cursor from a previous request.' }
        },
        required: ['start_date', 'end_date']
      }
    }
  }
};

export { apiTool };

import { ApiTool, figmaRequest } from "../../../lib/tools.ts";

const executeFunction = async ({ token_type, token, token_name, user_email, ip_address, event_source, date_range, limit, cursor }: any) => {
  return figmaRequest(`/v1/developer_logs`, {
    method: 'POST',
    body: { token_type, token, token_name, user_email, ip_address, event_source, date_range, limit, cursor }
  });
};

const apiTool: ApiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_developer_logs',
      description: 'Get developer log entries for REST API and MCP server requests in the organization. Requires a plan access token with org:developer_log_read (Enterprise). Note: this is a POST request with a JSON filter body.',
      parameters: {
        type: 'object',
        properties: {
          token_type: { type: 'string', description: 'Filter by auth token type: plan_access_token, developer_token, or oauth_token.' },
          token: { type: 'string', description: 'Filter by token value(s), comma-separated.' },
          token_name: { type: 'string', description: 'Filter by token name prefix(es), comma-separated.' },
          user_email: { type: 'string', description: 'Filter by user email prefix(es), comma-separated.' },
          ip_address: { type: 'string', description: 'Filter by IP address prefix(es), comma-separated.' },
          event_source: { type: 'string', description: 'Filter by event source: rest_api or mcp_server.' },
          date_range: { type: 'string', description: 'Filter by date range: last_24h, last_7d, or last_30d (default).' },
          limit: { type: 'number', description: 'Maximum number of entries to return (1-100, default 25).' },
          cursor: { type: 'string', description: 'Pagination cursor from a previous request.' }
        },
        required: []
      }
    }
  }
};

export { apiTool };

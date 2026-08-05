import { ApiTool, figmaRequest } from "../../../lib/tools.ts";

const executeFunction = async ({ plugin_payment_token, user_id, community_file_id, plugin_id, widget_id }: any) => {
  return figmaRequest(`/v1/payments`, { query: { plugin_payment_token, user_id, community_file_id, plugin_id, widget_id } });
};

const apiTool: ApiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_payments',
      description: 'Get a user\'s payment information for a plugin, widget, or Community file you own. Use either plugin_payment_token, or user_id plus exactly one of community_file_id/plugin_id/widget_id.',
      parameters: {
        type: 'object',
        properties: {
          plugin_payment_token: { type: 'string', description: 'Short-lived token from the plugin payments API (used when calling from a plugin/widget).' },
          user_id: { type: 'string', description: 'The ID of the user to query payment information about.' },
          community_file_id: { type: 'string', description: 'The Community file ID to query. Provide exactly one of community_file_id/plugin_id/widget_id.' },
          plugin_id: { type: 'string', description: 'The plugin ID to query. Provide exactly one of community_file_id/plugin_id/widget_id.' },
          widget_id: { type: 'string', description: 'The widget ID to query. Provide exactly one of community_file_id/plugin_id/widget_id.' }
        },
        required: []
      }
    }
  }
};

export { apiTool };

import { ApiTool, figmaRequest } from "../../../lib/tools.ts";

const executeFunction = async ({ context, context_id, plan_api_id, cursor }: any) => {
  return figmaRequest(`/v2/webhooks`, { query: { context, context_id, plan_api_id, cursor } });
};

const apiTool: ApiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_webhooks',
      description: 'Get webhooks by context or plan. Provide either context + context_id, or plan_api_id (paginated).',
      parameters: {
        type: 'object',
        properties: {
          context: { type: 'string', description: 'Context to filter by: "team", "project", or "file".' },
          context_id: { type: 'string', description: 'The id of the context to get attached webhooks for. Cannot be combined with plan_api_id.' },
          plan_api_id: { type: 'string', description: 'The plan id to get all webhooks for all accessible contexts. Cannot be combined with context/context_id.' },
          cursor: { type: 'string', description: 'Pagination cursor (only used with plan_api_id).' }
        },
        required: []
      }
    }
  }
};

export { apiTool };

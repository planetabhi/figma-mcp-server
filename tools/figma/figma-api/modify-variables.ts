import { ApiTool, figmaRequest } from "../../../lib/tools.ts";

const executeFunction = async ({ file_key, variableCollections, variableModes, variables, variableModeValues }: any) => {
  const body: Record<string, unknown> = {};
  if (variableCollections) body.variableCollections = variableCollections;
  if (variableModes) body.variableModes = variableModes;
  if (variables) body.variables = variables;
  if (variableModeValues) body.variableModeValues = variableModeValues;
  return figmaRequest(`/v1/files/${file_key}/variables`, { method: 'POST', body });
};

const apiTool: ApiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'modify_variables',
      description: 'Bulk create, update, and delete variables, variable collections, modes, and mode values in a file. Provide at least one of the arrays; each item needs an "action" of CREATE, UPDATE, or DELETE. Requires an Enterprise organization with Editor seats.',
      parameters: {
        type: 'object',
        properties: {
          file_key: { type: 'string', description: 'The key of the Figma file (or branch key) to modify variables in.' },
          variableCollections: { type: 'array', description: 'Create/update/delete variable collections. Each item requires an "action".', items: { type: 'object' } },
          variableModes: { type: 'array', description: 'Create/update/delete modes within variable collections.', items: { type: 'object' } },
          variables: { type: 'array', description: 'Create/update/delete variables.', items: { type: 'object' } },
          variableModeValues: { type: 'array', description: 'Set a variable value under a specific mode.', items: { type: 'object' } }
        },
        required: ['file_key']
      }
    }
  }
};

export { apiTool };

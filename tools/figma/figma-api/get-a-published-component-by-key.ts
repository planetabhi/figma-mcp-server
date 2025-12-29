import { ApiTool, getFigmaToken } from "../../../lib/tools.ts";
const executeFunction = async ({ key }: any) => {
  const baseUrl = 'https://api.figma.com/v1/components';
  const token = getFigmaToken();
  try {
    const url = `${baseUrl}/${key}`;

    const headers = {
      'X-Figma-Token': token
    };

    const response = await fetch(url, {
      method: 'GET',
      headers
    });

    if (!response.ok) {
      const errorData = await response.json() as any;
      throw new Error(`Figma API Error: ${errorData.message || response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) { throw error; }
};

const apiTool: ApiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_published_component_by_key',
      description: 'Retrieve metadata for a published component by its key.',
      parameters: {
        type: 'object',
        properties: {
          key: {
            type: 'string',
            description: 'The key of the component to retrieve.'
          }
        },
        required: ['key']
      }
    }
  }
};

export { apiTool };
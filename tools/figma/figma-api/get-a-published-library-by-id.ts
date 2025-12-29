import { ApiTool, getFigmaToken } from "../../../lib/tools.ts";
const executeFunction = async ({ library_id }: any) => {
  const baseUrl = 'https://api.figma.com';
  const token = getFigmaToken();
  try {
    const url = `${baseUrl}/v1/libraries/${library_id}`;

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
      name: 'get_library_by_id',
      description: 'Retrieve metadata for a published library by its ID.',
      parameters: {
        type: 'object',
        properties: {
          library_id: {
            type: 'string',
            description: 'The ID of the library to retrieve.'
          }
        },
        required: ['library_id']
      }
    }
  }
};

export { apiTool };
const executeFunction = async ({ key }) => {
  const baseUrl = 'https://api.figma.com';
  const token = process.env.FIGMA_API_KEY;
  try {
    const url = `${baseUrl}/v1/component_sets/${key}`;

    const headers = {
      'X-Figma-Token': token
    };

    const response = await fetch(url, {
      method: 'GET',
      headers
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error retrieving component set metadata:', error);
    return { error: 'An error occurred while retrieving component set metadata.' };
  }
};

const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_component_set',
      description: 'Retrieve metadata for a published component set by its key.',
      parameters: {
        type: 'object',
        properties: {
          key: {
            type: 'string',
            description: 'The key of the component set to retrieve.'
          }
        },
        required: ['key']
      }
    }
  }
};

export { apiTool };
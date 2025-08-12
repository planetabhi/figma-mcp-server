const executeFunction = async ({ key }) => {
  const baseUrl = 'https://api.figma.com/v1/components';
  const token = process.env.FIGMA_API_KEY;
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
      const errorData = await response.json();
      throw new Error(errorData);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error retrieving component metadata:', error);
    return { error: 'An error occurred while retrieving component metadata.' };
  }
};

const apiTool = {
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
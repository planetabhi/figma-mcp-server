const executeFunction = async ({ key }) => {
  const baseUrl = 'https://api.figma.com';
  const token = process.env.FIGMA_API_KEY;
  try {
    const url = `${baseUrl}/v1/styles/${key}`;

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
    console.error('Error retrieving published style:', error);
    return { error: 'An error occurred while retrieving the published style.' };
  }
};

const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_published_style',
      description: 'Retrieve metadata for a published style by its key.',
      parameters: {
        type: 'object',
        properties: {
          key: {
            type: 'string',
            description: 'The key of the published style to retrieve.'
          }
        },
        required: ['key']
      }
    }
  }
};

export { apiTool };
const executeFunction = async ({ file_key, name }) => {
  const baseUrl = 'https://api.figma.com';
  const token = process.env.FIGMA_API_KEY;
  try {
    const url = `${baseUrl}/v1/files/${file_key}/variables`;

    const headers = {
      'X-Figma-Token': token,
      'Content-Type': 'application/json'
    };

    const body = JSON.stringify({
      variableCollections: [
        {
          action: 'CREATE',
          name: name
        }
      ]
    });

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating variable collections:', error);
    return { error: 'An error occurred while creating variable collections.' };
  }
};

const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_variable_collections',
      description: 'Create variable collections for a Figma file.',
      parameters: {
        type: 'object',
        properties: {
          file_key: {
            type: 'string',
            description: 'The key of the Figma file where the variable collection will be created.'
          },
          name: {
            type: 'string',
            description: 'The name of the variable collection to create.'
          }
        },
        required: ['file_key', 'name']
      }
    }
  }
};

export { apiTool };
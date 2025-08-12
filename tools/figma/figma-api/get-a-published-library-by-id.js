const executeFunction = async ({ library_id }) => {
  const baseUrl = 'https://api.figma.com';
  const token = process.env.FIGMA_API_KEY;
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
      const errorData = await response.json();
      throw new Error(errorData);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error retrieving library metadata:', error);
    return { error: 'An error occurred while retrieving library metadata.' };
  }
};

const apiTool = {
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
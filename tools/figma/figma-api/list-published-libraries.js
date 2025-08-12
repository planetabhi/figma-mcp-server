const executeFunction = async () => {
  const baseUrl = 'https://api.figma.com/v1/libraries/published';
  const token = process.env.FIGMA_API_KEY;
  try {
    const headers = {
      'X-Figma-Token': token
    };

    const response = await fetch(baseUrl, {
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
    console.error('Error listing published libraries:', error);
    return { error: 'An error occurred while listing published libraries.' };
  }
};

const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'list_published_libraries',
      description: 'Returns all published libraries available to the authenticated user.',
      parameters: {
        type: 'object',
        properties: {},
        required: []
      }
    }
  }
};

export { apiTool };
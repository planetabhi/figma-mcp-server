const executeFunction = async ({ library_file_key }) => {
  const baseUrl = 'https://api.figma.com';
  const token = process.env.FIGMA_API_KEY;
  try {
    const url = `${baseUrl}/v1/analytics/libraries/${library_file_key}/usages`;

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
    console.error('Error retrieving library usage analytics:', error);
    return { error: 'An error occurred while retrieving library usage analytics.' };
  }
};

const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_library_usage_analytics',
      description: 'Retrieve usage analytics for a specific published library file.',
      parameters: {
        type: 'object',
        properties: {
          library_file_key: {
            type: 'string',
            description: 'The key of the library file for which to retrieve usage analytics.'
          }
        },
        required: ['library_file_key']
      }
    }
  }
};

export { apiTool };
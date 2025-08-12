const executeFunction = async ({ file_key }) => {
  const baseUrl = 'https://api.figma.com';
  const token = process.env.FIGMA_API_KEY;
  try {
    const url = `${baseUrl}/v1/files/${file_key}/dev_resources`;

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
    console.error('Error listing development resources:', error);
    return { error: 'An error occurred while listing development resources.' };
  }
};

const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'list_dev_resources',
      description: 'List development resources for a specific Figma file.',
      parameters: {
        type: 'object',
        properties: {
          file_key: {
            type: 'string',
            description: 'The key of the Figma file to retrieve development resources for.'
          }
        },
        required: ['file_key']
      }
    }
  }
};

export { apiTool };
const executeFunction = async ({ project_id }) => {
  const baseUrl = 'https://api.figma.com';
  const token = process.env.FIGMA_API_KEY;

  try {
    const url = `${baseUrl}/v1/projects/${project_id}/files`;

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
    console.error('Error listing files in project:', error);
    return { error: 'An error occurred while listing files in the project.' };
  }
};

const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'list_files_in_project',
      description: 'List files in a specified Figma project.',
      parameters: {
        type: 'object',
        properties: {
          project_id: {
            type: 'string',
            description: 'The ID of the project to list files from.'
          }
        },
        required: ['project_id']
      }
    }
  }
};

export { apiTool };
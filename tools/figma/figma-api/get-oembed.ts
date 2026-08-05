import { ApiTool, figmaRequest } from "../../../lib/tools.ts";

const executeFunction = async ({ url, maxwidth, maxheight }: any) => {
  return figmaRequest(`/v1/oembed`, { query: { url, maxwidth, maxheight } });
};

const apiTool: ApiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_oembed',
      description: 'Get oEmbed data for a Figma file or published Make site URL, following the oEmbed specification.',
      parameters: {
        type: 'object',
        properties: {
          url: { type: 'string', description: 'The URL of the Figma file or published Make site to retrieve oEmbed data for.' },
          maxwidth: { type: 'number', description: 'Maximum width of the embed in pixels. Defaults to 800.' },
          maxheight: { type: 'number', description: 'Maximum height of the embed in pixels. Defaults to 450.' }
        },
        required: ['url']
      }
    }
  }
};

export { apiTool };

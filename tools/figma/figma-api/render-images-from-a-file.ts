import { ApiTool, figmaRequest } from "../../../lib/tools.ts";

const executeFunction = async ({ file_key, ids, scale, format, version, svg_outline_text, svg_include_id, svg_include_node_id, svg_simplify_stroke, contents_only, use_absolute_bounds }: any) => {
  return figmaRequest(`/v1/images/${file_key}`, {
    query: { ids, scale, format, version, svg_outline_text, svg_include_id, svg_include_node_id, svg_simplify_stroke, contents_only, use_absolute_bounds }
  });
};

const apiTool: ApiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'render_images',
      description: 'Render one or more nodes of a Figma file as images (PNG/JPG/SVG/PDF) and return a map of node IDs to download URLs. URLs expire after 30 days.',
      parameters: {
        type: 'object',
        properties: {
          file_key: { type: 'string', description: 'The key of the Figma file (or branch key).' },
          ids: { type: 'string', description: 'Comma-separated list of node IDs to render.' },
          scale: { type: 'number', description: 'Image scaling factor between 0.01 and 4.' },
          format: { type: 'string', description: 'Output format: png (default), jpg, svg, or pdf.' },
          version: { type: 'string', description: 'A specific version ID to render. Defaults to the current version.' },
          svg_outline_text: { type: 'boolean', description: 'Render text as outlines (vector paths) instead of <text> elements in SVGs. Default true.' },
          svg_include_id: { type: 'boolean', description: 'Include id attributes (layer names) for all SVG elements. Default false.' },
          svg_include_node_id: { type: 'boolean', description: 'Include data-node-id attributes for all SVG elements. Default false.' },
          svg_simplify_stroke: { type: 'boolean', description: 'Simplify inside/outside strokes to use the stroke attribute where possible. Default true.' },
          contents_only: { type: 'boolean', description: 'Exclude content that overlaps the node from rendering. Default true.' },
          use_absolute_bounds: { type: 'boolean', description: 'Use the full node dimensions regardless of cropping or empty space. Default false.' }
        },
        required: ['file_key', 'ids']
      }
    }
  }
};

export { apiTool };

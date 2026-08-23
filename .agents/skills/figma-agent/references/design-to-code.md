# Design to code

This covers building UI from a link, inspecting nodes, extracting design tokens, exporting assets, and detecting changes. All of these are read only and work for a viewer role.

## Build UI from a frame

1. Parse the link to get the file key and the node ids. Replace each dash in a node id with a colon.
2. Call `get_file_nodes` with the ids and a shallow `depth`. This gives you structure without a huge payload.
3. Call `render_images` with format png for the same ids. Use the image as visual ground truth.
4. Read layout from the node data. Auto layout maps to flexbox. Item spacing maps to gap. Padding maps to padding. Fills map to background and color.
5. Reuse existing components. Call `list_components` and map instances to code components you already have instead of regenerating them.
6. Generate the code, then compare it against the rendered image and fix the gaps.

## Inspect a node for measurements

Call `get_file_nodes` for the node. Read fills for colors, typography for font family, size, weight, and line height, and the layout fields for spacing and alignment. Add `geometry` set to paths when you need vector outlines.

## Extract design tokens

Try variables first, then fall back to styles.

1. Call `list_file_variables` for local variables, or `get_published_variables` for a published library. Variables need an Enterprise plan. `get_published_variables` also needs the file to be published as a library. If the call returns 403 or an empty result, fall back to styles.
2. If variables are not available, call `list_styles_in_file`. This returns only style metadata like the name and type, not the color or type values. Read the style node with `get_file_nodes` to get the actual values.
3. Map the values to your target format. Common targets are CSS custom properties, a Tailwind theme, or a `tokens.json` file. Pick one and stay consistent.
4. Variable modes map to themes. A light mode and a dark mode become two sets of values under the same token names.
5. Resolve aliases before you output. A variable value can point to another variable, and each value is keyed by a mode id. Follow the aliases to real values and map the mode ids to their mode names.

## Export assets

Use `render_images` with format svg for icons and simple vectors, and png or jpg for raster art. Set `svg_include_id` to true when you want layer names on the SVG elements. Use `get_image_fills` for photos and images placed as fills. Download every file right away because the URLs expire after 30 days.

## Detect changes

Call `get_file_meta` and `get_file_version_history` to see if the design changed since your last run. Regenerate only the nodes that changed instead of rebuilding everything.

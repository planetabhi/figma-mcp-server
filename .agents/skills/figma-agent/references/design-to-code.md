# Design to code

This covers building UI from a link, inspecting nodes, extracting design tokens, exporting assets, and detecting changes. All of these are read only and work for a viewer role.

## Ground the code in the existing codebase

Never treat the Figma file as the only source of truth. The existing codebase is a source of truth too. Study it first and match it, so your output fits the project instead of fighting it.

Before you generate, learn the project.

- Framework and language. Find the framework and whether the project uses TypeScript, so you write the right kind of component.
- Styling approach. See how styles are written, such as plain CSS, CSS Modules, Tailwind, or a styled system, and follow it. Do not introduce a new styling method.
- Design tokens. Look for tokens or a theme already in the code. Map Figma values to those names instead of inventing new ones. Only pull a token from Figma for a value the code does not already have.
- Component architecture. Find where components live, how they are named, and how they compose from smaller pieces.
- Project standards. Note the type safety, lint rules, tests, and the dependencies the project already allows.

Then build to fit.

- Reuse before you create. Search for an existing component before making a new one. If one exists, use it and keep its current props and API. Do not duplicate it.
- Compose from existing primitives rather than building everything from scratch.
- Place files, name things, and write types the way the rest of the repo does.
- Match the checks. Keep it type safe, pass the linter, and add or update tests the way the project does.
- Do not add a new dependency unless there is no reasonable way to avoid it.

## Build UI from a frame

1. Parse the link to get the file key and the node ids. Replace each dash in a node id with a colon.
2. Call `get_file_nodes` with the ids and a shallow `depth`. This gives you structure without a huge payload.
3. Call `render_images` with format png for the same ids. Use the image as visual ground truth.
4. Read layout from the node data. Auto layout maps to flexbox. Item spacing maps to gap. Padding maps to padding. Fills map to background and color.
5. Reuse existing components. Call `list_components` and map instances to code components you already have instead of regenerating them.
6. Generate the code, then compare it against the rendered image and fix the gaps.

To check the result against the design or iterate to a pixel match, hand off as described in references/visual-qa.md.

## Reason about responsive behavior

A frame is a static snapshot, but its layout data carries most of the responsive intent. Read that data before you guess.

1. Read the auto layout on each container. `layoutMode` is the direction. `layoutSizingHorizontal` and `layoutSizingVertical` are FIXED, HUG, or FILL. FILL means fluid, so use grow or full width. HUG means fit content. FIXED means a set width.
2. Record the clamp points. `minWidth` and `maxWidth` on a node become min width and max width in code, often the container max width for the page.
3. Read `layoutWrap`. WRAP means items reflow into a grid, which maps to flex wrap or a responsive grid.
4. Read `constraints` on children. LEFT, RIGHT, CENTER, SCALE, and STRETCH tell you how a child pins or stretches when the parent resizes.
5. Prefer real frames over guesses. If the file has other frames of the same screen at smaller sizes, compare them to see the actual mobile layout. That is the true answer.
6. If only a desktop frame exists, state breakpoint and transform ideas as assumptions to confirm, not facts. Common transforms to consider are columns stacking to one column, navigation collapsing to a menu, type scaling down, elements hiding or reordering, and overflow becoming wrap or scroll. Do not invent breakpoints the data does not support.

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

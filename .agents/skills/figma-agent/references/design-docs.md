# Design documentation

Use this to generate documentation, specs, or usage guidelines for a design component or pattern. It reads the design and writes human readable docs, not code. This is read only and works for a viewer role. It works for a single component or pattern and for a whole system.

Default the output to plain Markdown. If the repo already has a docs format, match it instead.

## Steps

1. Fetch and render the component with `get_file_nodes` and `render_images` so you can describe what it looks like.
2. Read the variants and states from the component set with `list_component_sets`, and from the node states in the data, such as default, hover, and disabled.
3. Read the tokens the component uses from `list_file_variables` or `list_styles_in_file`.
4. Write the doc using the structure below.

## Doc structure

- Overview. What the component is and when to use it.
- Anatomy. The parts of the component and what each one does.
- Variants and states. The variations and interaction states, with a rendered image where it helps.
- Options. The configurable pieces a developer would expose.
- Tokens. The colors, spacing, and type it pulls from.
- Usage guidelines. When to use it, when not to, and do and do not examples.
- Accessibility. Contrast, focus order, target size, and labels.

Keep each section short and factual. Only include what the design actually shows. Do not invent behavior that is not in the file.

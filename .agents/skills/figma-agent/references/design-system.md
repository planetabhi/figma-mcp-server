# Design system sync

Use this when the job is the whole component and token library, not one screen. It maps a Figma library to a code library so a design system stays in step. This is read only and works for a viewer role. Team tools need a `team_id` from a team URL, not a `file_key`.

1. List the library. For a single file use `list_components` and `list_component_sets`. For a shared team library use `get_team_components`, `get_team_component_sets`, and `get_team_styles`. The team endpoints are paginated. The default page size is 30 and the max is 1000. Follow the `after` cursor until you have the whole library, or your inventory will be incomplete.
2. Pull the tokens. Follow the Extract design tokens steps in references/design-to-code.md so components and their variables and styles come together.
3. Match each Figma component to its code counterpart by name. Flag the ones that have no code yet and the code components that no longer exist in Figma.
4. Resolve a specific published item when you need its details. Use `get_published_component_by_key`, `get_component_set`, or `get_published_style`.
5. Keep names consistent across both sides so the mapping holds up over time. Report the gaps you found instead of silently guessing.

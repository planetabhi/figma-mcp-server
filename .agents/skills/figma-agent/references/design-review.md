# Design review

Review a design and leave feedback as Figma comments. This needs the `file_comments:read` and `file_comments:write` scopes, and commenting must be enabled on the file. A viewer role can comment when the file allows it. If a post returns 403, commenting is likely turned off or the token is missing `file_comments:write`.

## Review loop

1. Fetch and render the target node with `get_file_nodes` and `render_images` so you can see it.
2. Evaluate the design against clear criteria.
   - Accessibility. Color contrast, text size, and touch target size.
   - Design system. Colors and spacing come from the token set, not one off values.
   - Responsiveness. The layout holds up at different sizes.
   - Consistency. Spacing, type, and components match the rest of the file.
3. For each issue, call `post_comment` with a short message and pin it to the node.

## Pin a comment to a node

`post_comment` takes a file key, a message, and `client_meta`. Set `client_meta.node_id` to the node the comment is about, and optional x and y for the offset. The tool turns this into a node offset for you. Without a node id the comment lands at the canvas origin, which is not useful for the designer.

## Write good feedback

Be specific and actionable. Say what is wrong and what to change. For example, a label at 3.1 to 1 contrast fails the WCAG AA target of 4.5 to 1, so darken the text. Batch related notes together instead of posting one comment per pixel. Anchor each comment to the node it refers to.

## Sign every comment

End each comment you post with a short signature that names you, so the designer knows the note came from an assistant. Write it as Added by Claude, Added by GPT, or the name of whichever model you are. Put it on its own line at the end of the message.

## Triage existing comments

Call `list_comments` to read the threads. Turn them into action items you can act on in code. Reply with `post_comment`. Acknowledge a resolved thread with `post_comment_reaction`.

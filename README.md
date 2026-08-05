# Figma MCP Server
A local MCP server with full Figma REST API coverage. Works with Claude Desktop, Cursor, VS Code, the Gemini CLI, and any MCP client.

## How it works

The server exposes the Figma REST API as MCP tools. Each endpoint is one tool. Tools are auto-discovered at startup from `tools/figma/`, so adding an endpoint is just adding a file. Every tool is self-describing with a JSON Schema, and required parameters are validated before each call. It runs over stdio by default (how desktop clients spawn it) or over SSE with the `--sse` flag. It ships with a single runtime dependency, the MCP SDK, and requires Bun.

### Prerequisites

- [Bun](https://bun.sh/) (>= 1.2). Node is not supported.

## Install

Available on npm and the official MCP Registry. Bun-native (raw TypeScript, uses `Bun.Glob`), so run it with `bunx`, not `npx`.

```bash
bunx figma-mcp-server
```

Or install it globally:

```bash
bun add -g figma-mcp-server
```

## Figma API key

Create a personal access token in Figma under Settings > Security > Personal access tokens > Generate new token. Provide it as `FIGMA_API_KEY`, ideally in your client config's `env` block (see below).

## Configure your client

Every client uses the same server. Point `command` at `bunx`, or its absolute path (`which bunx`) if the client cannot find it on `PATH`.

```json
{
  "mcpServers": {
    "figma": {
      "command": "bunx",
      "args": ["figma-mcp-server"],
      "env": {
        "FIGMA_API_KEY": "your_figma_api_key_here"
      }
    }
  }
}
```

Config file locations:

- Claude Desktop: Settings > Developer > Edit Config (`claude_desktop_config.json`)
- Cursor: `~/.cursor/mcp.json`, or `.cursor/mcp.json` per project
- Gemini CLI: `~/.gemini/settings.json`
- VS Code: `.vscode/mcp.json`, using the `servers` key with `"type": "stdio"`

Restart the client after editing its config.

## Tool coverage

Full coverage of the Figma REST API (non-deprecated endpoints). 49 tools.

**Files and nodes**
- `get_figma_file`, `get_file_nodes`, `render_images`, `get_image_fills`, `get_file_meta`, `get_file_version_history`

**Variables (design tokens)**
- `list_file_variables`, `get_published_variables`, `modify_variables`

**Components, component sets, styles**
- `list_components`, `get_published_component_by_key`, `get_team_components`
- `list_component_sets`, `get_component_set`, `get_team_component_sets`
- `list_styles_in_file`, `get_published_style`, `get_team_styles`

**Comments and reactions**
- `list_comments`, `post_comment`, `delete_comment`
- `get_comment_reactions`, `post_comment_reaction`, `delete_comment_reaction`

**Projects and users**
- `list_projects_in_team`, `list_files_in_project`, `get_project_meta`, `get_current_user`

**Dev resources**
- `list_dev_resources`, `create_dev_resources`, `update_dev_resources`, `delete_dev_resource`

**Webhooks**
- `get_webhooks`, `create_webhook`, `get_webhook`, `update_webhook`, `delete_webhook`, `get_webhook_requests`

**Library analytics**
- `get_library_component_actions`, `get_library_component_usages`
- `get_library_style_actions`, `get_library_style_usages`
- `get_library_variable_actions`, `get_library_variable_usages`

**Organization (Enterprise)**
- `get_activity_logs`, `get_developer_logs`, `get_ai_usage_daily`

**Embeds and payments**
- `get_oembed`, `get_payments`

### Plan requirements

Most tools work with any plan's personal access token. These need higher tiers:

- Variables (`list_file_variables`, `get_published_variables`, `modify_variables`): Enterprise organization.
- Library analytics (`get_library_*`): Organization or Enterprise plan.
- Activity logs, developer logs, AI usage: Enterprise organization with an admin or plan access token.

## SSE transport

The server runs over stdio by default. To serve over SSE instead:

```bash
bunx figma-mcp-server --sse
```

Default port is `3001`; override with `PORT`.

## Troubleshooting

- Invalid or missing `FIGMA_API_KEY`: set it in your client config's `env` block.
- `bunx` not found: use its absolute path from `which bunx`.
- SSE port in use: run with `PORT=<port>`.

---

[MIT License](https://raw.githubusercontent.com/planetabhi/figma-mcp-server/refs/heads/main/LICENSE) · By [@planetabhi](https://planetabhi.com/) ⋛⋋( ⊙◊⊙)⋌⋚
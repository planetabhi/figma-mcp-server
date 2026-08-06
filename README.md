# Figma MCP Server
A local MCP server with full Figma REST API coverage. Works with Claude Desktop, Cursor, VS Code, the Gemini CLI, and any MCP client.

## How it works

Each Figma REST endpoint is exposed as one self-describing MCP tool, auto-discovered at startup from `tools/figma/`, so adding an endpoint is just adding a file. Required parameters are validated before each call. It runs over stdio by default (how desktop clients spawn it) or over SSE with `--sse`.

### Prerequisites

- [Bun](https://bun.sh/) (>= 1.2). Node is not supported. The server is Bun-native (uses `Bun.Glob`), so run it with `bunx`, not `npx`.

## Install

Available on npm and the official MCP Registry. Normally your MCP client launches it for you (see [Configure your client](#configure-your-client)).

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
- VS Code: `.vscode/mcp.json` (see below)

Restart the client after editing its config.

### VS Code

Use `.vscode/mcp.json` (workspace) or your user `mcp.json`, with a `servers` key. Instead of hardcoding the token, define an input so VS Code prompts for it securely:

```json
{
  "inputs": [
    {
      "type": "promptString",
      "id": "figma-api-key",
      "description": "Figma API Key",
      "password": true
    }
  ],
  "servers": {
    "figma": {
      "command": "bunx",
      "args": ["figma-mcp-server"],
      "env": {
        "FIGMA_API_KEY": "${input:figma-api-key}"
      }
    }
  }
}
```

- With `${input:figma-api-key}`, VS Code prompts you for the key the first time the server starts, then stores it in your OS secret storage.
- To re-enter or clear it: Command Palette → **MCP: List Servers** → pick the server → reset/edit its inputs.

## Tool coverage

Full coverage of the Figma REST API (non-deprecated endpoints), 49 tools across:

- Files and nodes (files, node trees, image rendering, image fills, metadata, version history)
- Variables / design tokens (read, published, bulk modify)
- Components, component sets, and styles (file, published, and team scopes)
- Comments and reactions
- Projects and users
- Dev resources
- Webhooks (v2)
- Library analytics (component, style, and variable actions and usages)
- Organization: activity logs, developer logs, AI usage (Enterprise)
- Embeds and payments

Run `bun run list-tools` (or check your MCP client's tool list) for the full, always-current list of tool names and parameters.

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

---

[MIT License](https://raw.githubusercontent.com/planetabhi/figma-mcp-server/refs/heads/main/LICENSE) · By [@planetabhi](https://planetabhi.com/) ⋛⋋( ⊙◊⊙)⋌⋚
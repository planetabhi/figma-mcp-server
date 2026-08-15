# Figma MCP Server
A local MCP server with full Figma REST API coverage. Works with Claude Desktop, Cursor, VS Code, the Gemini CLI, and any MCP client. Available on [npm](https://www.npmjs.com/package/figma-mcp-server) and the official [MCP Registry](https://registry.modelcontextprotocol.io/v0/servers?search=io.github.planetabhi/figma-mcp-server).

## How it works

Each Figma REST endpoint is exposed as one self-describing MCP tool, auto-discovered at startup from `tools/figma/`, so adding an endpoint is just adding a file. Required parameters are validated before each call. It runs over stdio.

### Prerequisites

Requires [Bun](https://bun.sh/) ≥ 1.2. It's Bun-native, so launch it with `bunx`, not `npx` (Node isn't supported).

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

Full coverage of the Figma REST API (non-deprecated endpoints), 50 tools across:

- Files and nodes (files, node trees, image rendering, image fills, metadata, version history)
- Variables / design tokens (read, published, bulk modify)
- Components, component sets, and styles (file, published, and team scopes)
- Comments and reactions
- Folders (top-level folders, subfolders, files, metadata)
- Users
- Dev resources
- Webhooks (v2)
- Library analytics (component, style, and variable actions and usages)
- Organization: activity logs, developer logs, AI usage (Enterprise)
- Embeds and payments

Check your MCP client's tool list for the full, always-current list of tool names and parameters.

### Plan requirements

Most tools work with any plan's personal access token. These need higher tiers:

- Variables (`list_file_variables`, `get_published_variables`, `modify_variables`): Enterprise organization.
- Library analytics (`get_library_*`): Organization or Enterprise plan.
- Activity logs, developer logs, AI usage: Enterprise organization with an admin or plan access token.

---

[MIT License](https://raw.githubusercontent.com/planetabhi/figma-mcp-server/refs/heads/main/LICENSE) · By [@planetabhi](https://planetabhi.com/) ⋛⋋( ⊙◊⊙)⋌⋚
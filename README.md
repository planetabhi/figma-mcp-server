# Figma MCP Server

A single call leaves your editor and returns with a design laid open. This is a local server that carries the whole of the Figma REST API, every endpoint within reach and none withheld. It speaks with Claude Desktop, Cursor, VS Code, the Gemini CLI, and any client that speaks MCP. You will find it on [npm](https://www.npmjs.com/package/figma-mcp-server) and in the official [MCP Registry](https://registry.modelcontextprotocol.io/v0/servers?search=io.github.planetabhi/figma-mcp-server), waiting to be called.

![NPM Downloads](https://img.shields.io/npm/d18m/figma-mcp-server)

## How it works

Every endpoint of the Figma REST API stands here as a single self-describing tool, and each one says plainly what it needs. At startup the server walks the `tools/figma/` directory and gathers them, so to teach it a new endpoint you lay down one new file and nothing more. Before any call goes out its required parameters are weighed, and the unfinished request is turned back at the threshold. It speaks over stdio, quietly, one message at a time.

### Prerequisites

This server is grown from [Bun](https://bun.sh/), and it asks for version 1.2 or newer. Being Bun-native, it answers to `bunx` and not to `npx`, for Node cannot carry it.

## Figma API key

One key opens the whole door. Create a personal access token in Figma under Settings > Security > Personal access tokens > Generate new token, then give it to the server as `FIGMA_API_KEY`, set within your client config's `env` block as shown below.

## Configure your client

Many clients, and one server beneath them all. Point `command` at `bunx`, or at its absolute path from `which bunx` when the client cannot find it on your `PATH`.

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

Each client keeps its config in its own place.

- Claude Desktop: Settings > Developer > Edit Config (`claude_desktop_config.json`)
- Cursor: `~/.cursor/mcp.json`, or `.cursor/mcp.json` per project
- Gemini CLI: `~/.gemini/settings.json`

Once the config is written, restart the client so the change takes hold.

### VS Code

Use `.vscode/mcp.json` for a workspace, or your user `mcp.json`, each holding a `servers` key. Rather than carve the token into the file, name an input and let VS Code ask for it, so the secret is spoken once and then kept safe.

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

The whole of the Figma REST API is here, every endpoint that still stands, fifty-five tools in all, gathered across these domains.

- Files and nodes (files, node trees, image rendering, image fills, metadata, version history, duplicate)
- Variables / design tokens (read, published, bulk modify)
- Components, component sets, and styles (file, published, and team scopes)
- Comments and reactions
- Teams (get, create, invite members)
- Folders (top-level folders, subfolders, files, metadata, create)
- Users
- Dev resources
- Webhooks (v2)
- Library analytics (component, style, and variable actions and usages)
- Organization: activity logs, developer logs, AI usage (Enterprise)
- Embeds and payments

For the full and ever-current roll of tool names and their parameters, look to your MCP client's own list.

### Plan requirements

Most tools open to any plan's personal access token. A few ask for more.

- Variables (`list_file_variables`, `get_published_variables`, `modify_variables`): Enterprise organization.
- Library analytics (`get_library_*`): Organization or Enterprise plan.
- Activity logs, developer logs, AI usage: Enterprise organization with an admin or plan access token.
- File duplication, team and folder creation, and team invites (`duplicate_file`, `create_team`, `create_folder`, `invite_team_members`): Enterprise plan via a private OAuth app.

## Kept in sync

Figma's API does not stand still, and neither does this server. Twice each month, on the first day and the fifteenth, a workflow wakes of its own accord, reaches out for the newest Figma specification, and sets it beside the one already held, marking every endpoint that has arrived, changed, or departed. It runs the type checks and the tests before it trusts the change, and when all of it holds it opens a pull request for a human to read and welcome in. You may also call it by hand whenever the need arises. The work lives in [.github/workflows/sync-spec.yml](.github/workflows/sync-spec.yml), and the spec it tends is kept in `spec/figma-openapi.json`.

---

[MIT License](https://raw.githubusercontent.com/planetabhi/figma-mcp-server/refs/heads/main/LICENSE) · By [@planetabhi](https://planetabhi.com/) ⋛⋋( ⊙◊⊙)⋌⋚

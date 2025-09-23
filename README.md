# Figma MCP Server
A comprehensive local MCP server for Figma. Connect Figma with the Gemini CLI, Cursor, and Claude Desktop.

> Prerequisites: Node >= 20, Bun >= 1.1.0

Install Bun (macOS/Linux):

```bash
curl -fsSL https://bun.sh/install | bash
# Then restart your terminal or source your shell profile
```

## Install
Install the server

```bash
git clone https://github.com/planetabhi/figma-mcp-server.git
cd figma-mcp-server
bun i
```

### Set tool environment variable
Create a `.env` file and set the `FIGMA_API_KEY` to your Figma API key.

```bash
FIGMA_API_KEY=
```

> To generate a new personal access token, log in to your Figma account, then from the top-left menu, head to Settings, click on the security tab, find the Personal access tokens section, and click Generate new token to open the configuration modal where you can set the expiration and scopes before clicking Generate token.

### List All Tools
List descriptions and parameters from all available tools

```bash
bun run list-tools
```

## Run the MCP Server

### Modes

- Stdio (default for Claude Desktop and Gemini CLI): run `bun mcpServer.js` (no `--sse`).
- SSE (local web endpoint): run `bun start` or `bun mcpServer.js --sse`.
  - Port defaults to `3001` or use `PORT=<port>` to override.

### Find bun and server path

```bash
# Find bun path
which bun

# Get the absolute path of the MCP server
realpath mcpServer.js
```


### Run with Claude Desktop

1. Open Claude Desktop → **Settings** → **Developers** → **Edit Config** and add your server:

```json
{
  "mcpServers": {
    "figma-mcp-server": {
      "command": "<absolute_path_to_bun>",
      "args": ["<absolute_path_to_mcpServer.js>"]
    }
  }
}
```

2. Restart Claude Desktop to activate config change.

> To try it out in Claude Desktop, first enable the `get_file_nodes` tool from the tools list. Copy a design node link from a Figma file, then paste it into Claude Desktop prompt. It will return the design node data and other information.


### Run with Gemini CLI

1. Open a new terminal and create the `.gemini` directory (if it doesn't exist)

```bash
mkdir -p ~/.gemini
```

2. Create the `settings.json` file

```bash
echo '{
  "mcpServers": {
    "figma-mcp-server": {
      "command": "<absolute_path_to_bun>",
      "args": ["mcpServer.js"],
      "cwd": "<absolute_path_to_working_directory>",
      "env": {
        "FIGMA_API_KEY": "your_figma_api_key_here"
      },
      "trust": true
    }
  }
}' > ~/.gemini/settings.json
```

3. Start Gemini CLI

```bash
export GEMINI_API_KEY="your_gemini_api_key_here"
npx https://github.com/google-gemini/gemini-cli
```

- Use `/mcp` to list all tools
- Use `/mcp desc` to show server and tool descriptions
- Use `/mcp schema` to show tool parameter schemas
- Use `/mcp nodesc` to hide descriptions

## npm (optional)

If you prefer npm instead of Bun, use these equivalents:

```bash
# Install
npm i

# List all tools
node index.js tools

# Run SSE locally (web/SSE mode)
node mcpServer.js --sse
```

For Claude Desktop and Gemini CLI, replace the `command` with the absolute path to `node` and keep the same `args`.


## Troubleshooting

- Missing Figma token:
  - Error: missing or invalid `FIGMA_API_KEY`. Ensure `.env` exists next to `mcpServer.js` with `FIGMA_API_KEY=...`.
- Port already in use (SSE mode):
  - Run with a custom port: `PORT=3005 bun start`.
- Bun not found:
  - Ensure `which bun` returns a path; restart your shell after installing Bun.


---

[MIT License](https://raw.githubusercontent.com/planetabhi/figma-mcp-server/refs/heads/main/LICENSE) · By [@planetabhi](https://planetabhi.com/) ⋛⋋( ⊙◊⊙)⋌⋚
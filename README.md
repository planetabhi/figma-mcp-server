# Figma MCP Server
A comprehensive local MCP server for Figma. Connect Figma with the Gemini CLI, Cursor, and Claude Desktop.

![Figma MCP Server Preview](/preview.webp)

### Prerequisites

- [Bun](https://bun.sh/) (>= 1.1.0)

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
bun list-tools
# or
bun index.ts tools
```

## Run the MCP Server

### Find bun and server path

```bash
# Find bun path
which bun

# Get the absolute path of the MCP server
realpath mcpServer.ts
```

### Run with Claude Desktop

1. Open Claude Desktop → **Settings** → **Developers** → **Edit Config** and add your server:

```json
{
  "mcpServers": {
    "figma-mcp-server": {
      "command": "<absolute_path_to_bun>",
      "args": ["<absolute_path_to_mcpServer.ts>"]
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
      "args": ["mcpServer.ts"],
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

---

### Troubleshooting

- Missing Figma token
  - Error: missing or invalid `FIGMA_API_KEY`. 
  - Ensure `.env` exists next to `mcpServer.ts` with `FIGMA_API_KEY=...`.
- Port already in use (SSE mode)
  - Run SSE on a custom port: `PORT=3005 bun mcpServer.ts --sse`.
- Bun not found
  - Ensure `which bun` returns a path. 
  - Restart your shell after installing Bun.
- Using npm instead of Bun
  - Replace `bun i` → `npm i`
  - Replace `bun list-tools` → `npx tsx index.ts tools`
- Manual start not required
  - Only start manually for SSE or local web endpoint: `bun mcpServer.ts --sse`
  - Default port is `3001`, override with `PORT=<port>`


---

[MIT License](https://raw.githubusercontent.com/planetabhi/figma-mcp-server/refs/heads/main/LICENSE) · By [@planetabhi](https://planetabhi.com/) ⋛⋋( ⊙◊⊙)⋌⋚
# Figma MCP Server
A simple MCP server for Figma

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
```

## Run the MCP Server

### Find node and server path

```bash
# Find node path
which node

# Get the absolute path of the MCP server
realpath mcpServer.js
```


### Run with Claude Desktop

1. Open Claude Desktop → **Settings** → **Developers** → **Edit Config** and add your server:

```json
{
  "mcpServers": {
    "figma-mcp-server": {
      "command": "<absolute_path_to_node>",
      "args": ["<absolute_path_to_mcpServer.js>"]
    }
  }
}
```

2. Restart Claude Desktop to activate config change.

> To try it out in Claude Desktop, first enable the `get_file_nodes` tool from the tools list. Copy a design node link from a Figma file, then paste it into Claude Desktop prompt. It will return the design node data and other information.

### Run in Postman

1. Choose an existing workspace or create a new one.
2. Select New > MCP. Postman opens a new MCP request in a new tab.
3. Select the server's communication method STDIO.
4. Enter the server's command and arguments.

```bash
# Create a new MCP request and add the server's command and arguments
STDIO <absolute_path_to_node> <absolute_path_to_mcpServer.js>
```

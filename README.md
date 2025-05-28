# Figma MCP Server
MCP server for Figma

## Install
Install the server

```sh
git clone https://github.com/planetabhi/figma-mcp-server.git
cd figma-mcp-server
pnpm i
```

### Set tool environment variables
In the `.env` file, set the `FIGMA_API_KEY` to your Figma API key.

```
FIGMA_API_KEY=
```

### List Figma Tools
List descriptions and parameters from all available Figma tools

```sh
pnpm list-tools
```

## Run the MCP Server

MCP Server `mcpServer.js` exposes your Figma API tools to MCP-compatible clients.

1. Find node path: `which node`
2. Find mcpServer.js path: `realpath mcpServer.js`

### Run with Postman

Postman desktop app is the easiest way to [run and test MCP servers](https://learning.postman.com/docs/postman-ai-agent-builder/mcp-requests/overview/).

1. Choose an existing workspace or create a new one.
2. Select New > MCP icon MCP. Postman opens a new MCP request in a new tab.
3. Select the server's communication method STDIO.
4. Enter the server's command and arguments.

```sh
STDIO <absolute_path_to_node> <absolute_path_to_mcpServer.js>
```

Or you can fork Postman [collection here](https://www.postman.com/doitagain/workspace/figma/collection/68369062465421c338809955?action=share&creator=17652550).

### Run with Claude Desktop

1. Open Claude Desktop → **Settings** → **Developers** → **Edit Config** and add your server:

```json
{
  "mcpServers": {
    "<server_name>": {
      "command": "<absolute_path_to_node>",
      "args": ["<absolute_path_to_mcpServer.js>"]
    }
  }
}
```

2. Restart Claude Desktop to activate this change.

#### Try it out:

1. Open Claude Desktop, then click on the search and tools icon button and select your server name from the list.
2. Enable the `get_design_node` tool from the tools list.
3. Copy a design node link from a Figma file, then paste it in Claude Desktop.
4. It will return the design node data and other information.

> Note: Some tools may be non-functional at the moment because of changes to the Figma API. Working on updating the endpoints in future updates.

---

### Additional Options

#### Docker Deployment (Production)

For production deployments, you can use Docker:

**1. Build Docker image**

```sh
docker build -t <your_server_name> .
```

**2. Claude Desktop Integration**

Add Docker server configuration to Claude Desktop (Settings → Developers → Edit Config):

```json
{
  "mcpServers": {
    "<your_server_name>": {
      "command": "docker",
      "args": ["run", "-i", "--rm", "--env-file=.env", "<your_server_name>"]
    }
  }
}
```

> Add your environment variables (API keys, etc.) inside the `.env` file.

#### Server-Sent Events (SSE)

To run the server with Server-Sent Events (SSE) support, use the `--sse` flag:

```sh
node mcpServer.js --sse
```
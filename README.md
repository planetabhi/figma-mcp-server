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

### Run with Claude Desktop

Open Claude Desktop → **Settings** → **Developers** → **Edit Config** and add your server:

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

Restart Claude Desktop to activate this change.

> Note: Some tools may be non-functional at the moment because of changes to the Figma API. Working on updating the endpoints in future releases.

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
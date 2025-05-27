# Figma MCP Server
MCP server for Figma

### Set tool environment variables
In the `.env` file, set the `FIGMA_API_KEY` to your Figma API key.

```
FIGMA_API_KEY=
```

### Install
Install the server

```sh
git clone https://github.com/planetabhi/figma-mcp-server.git
cd figma-mcp-server
pnpm i
```

### List Tools
List descriptions and parameters from all available tools

```sh
pnpm list-tools
```

## Run the MCP Server

The MCP Server (`mcpServer.js`) exposes your automated API tools to MCP-compatible clients.

### Run with Postman

Postman desktop app is the easiest way to run and test MCP servers.

Step 1: Download the latest Postman app from [https://www.postman.com/downloads/](https://www.postman.com/downloads/).

Step 2: Read out the documentation article [here](https://learning.postman.com/docs/postman-ai-agent-builder/mcp-requests/overview/) for the next steps.

### Run with Claude Desktop

To integrate with Claude Desktop:

1. Find node path:

```sh
which node
```

2. Find `mcpServer.js` path:

```sh
realpath mcpServer.js
```

3. Open Claude Desktop → **Settings** → **Developers** → **Edit Config** and add your server:

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

## Dockerfile (Included)

The project comes bundled with the following minimal Docker setup:

```dockerfile
FROM node:22.12-alpine AS builder

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

COPY . .

ENTRYPOINT ["node", "mcpServer.js"]
```

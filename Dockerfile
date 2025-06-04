FROM node:22.12-alpine AS builder

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

COPY . .

ENTRYPOINT ["node", "mcpServer.js"]
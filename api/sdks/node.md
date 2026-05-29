# Node.js SDK

Official Node.js SDK for the Escluse API. Source code and full API reference available on [GitHub](https://github.com/escluse/sdk-node).

## Installation

```bash
npm install @escluse/sdk
```

Requires Node.js 18 or later.

## Initialization

Create a client instance with your API key:

```typescript
import { Escluse } from '@escluse/sdk';

const client = new Escluse({
  apiKey: process.env.ESCLUSE_API_KEY
});
```

We recommend storing your API key in an environment variable rather than hardcoding it. The SDK will also read from the `ESCLUSE_API_KEY` environment variable automatically if no `apiKey` option is provided.

## Authentication

The SDK handles authentication automatically. All requests include the required `Authorization: Bearer` header.

For user-facing applications, you can also use the `auth` module for login flows:

```typescript
// Login with email/password
const { session } = await client.auth.login({
  email: 'user@example.com',
  password: 'your-password'
});

// The SDK stores the session and automatically refreshes tokens
```

## Basic Usage

### List Servers

```typescript
const { data: servers } = await client.servers.list();
console.log(servers);
```

### Create a Server

```typescript
const server = await client.servers.create({
  name: 'My Minecraft Server',
  gameType: 'minecraft',
  nodeId: 'node_xyz',
  resources: {
    cpu: 2,
    memory: '4GB'
  },
  options: {
    version: '1.20.4',
    mcLoader: 'paper',
    eulaAccepted: true
  }
});

console.log(`Server ${server.id} created with status: ${server.status}`);
```

### Get Node Status

```typescript
const { data: node } = await client.nodes.get('node_xyz');
console.log(`Node status: ${node.status}`);
```

## Error Handling

The SDK throws typed errors for API failures:

```typescript
import { EscluseError } from '@escluse/sdk';

try {
  const servers = await client.servers.list();
} catch (error) {
  if (error instanceof EscluseError) {
    console.error(`API Error [${error.code}]: ${error.message}`);
    // error.code: 'SRV_NOT_FOUND', 'AUTH_TOKEN_EXPIRED', etc.
    // error.status: HTTP status code
  } else {
    console.error('Network error:', error);
  }
}
```

Common error codes:

| Code | Description |
|------|-------------|
| `AUTH_TOKEN_EXPIRED` | Access token expired — SDK should auto-refresh |
| `SRV_NOT_FOUND` | Server ID does not exist |
| `RATE_LIMITED` | Too many requests — implement retry with backoff |

See the full [Error Code Catalog](/api/errors) for the complete list.

## Pagination

List endpoints return paginated responses. The SDK provides pagination helpers:

```typescript
// Automatic pagination
for await (const page of client.servers.listPaginated()) {
  for (const server of page.data) {
    console.log(server.name);
  }
}
```

## Next Steps

- Full API reference: [github.com/escluse/sdk-node](https://github.com/escluse/sdk-node)
- [Python SDK](/api/sdks/python) — Python SDK quickstart
- [API Overview](/api/overview) — Base URL, rate limits, response format
- [Error Codes](/api/errors) — Complete error code reference

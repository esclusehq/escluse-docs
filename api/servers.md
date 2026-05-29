# Servers API

Manage game servers via the REST API. This page covers server CRUD operations. For lifecycle management (start, stop, restart, kill, status, stats), see [Server Operations](/api/servers/operations). For console and logs, see [Console & Logs](/api/servers/console).

## List Servers

```http
GET /api/v1/servers
```

Retrieves a paginated list of all servers accessible to the authenticated user.

### Query Parameters
| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `page` | integer | No | 1 | Page number |
| `limit` | integer | No | 20 | Items per page (max 100) |

### Example Request

::: code-group

```bash [curl]
curl -X GET https://api.esluce.com/api/v1/servers \
  -H "Authorization: Bearer ${ESCLUSE_API_KEY}"
```

```typescript [Node.js SDK]
import { Escluse } from '@escluse/sdk';

const client = new Escluse({ apiKey: process.env.ESCLUSE_API_KEY });
const { data: servers } = await client.servers.list();
```

```python [Python SDK]
from escluse import Escluse

client = Escluse(api_key="your-api-key")
servers = client.servers.list()
```

:::

### Example Response

```json
{
  "data": [
    {
      "id": "srv_abc123",
      "name": "Minecraft Server",
      "game_type": "minecraft",
      "status": "running",
      "node_id": "node_xyz",
      "resources": { "cpu": 2, "memory": "4GB" },
      "created_at": "2026-05-10T12:00:00Z"
    }
  ],
  "pagination": { "page": 1, "limit": 20, "total": 5, "pages": 1 }
}
```

### Possible Errors

| HTTP | Code | Description |
|------|------|-------------|
| 401 | `AUTH_TOKEN_INVALID` | Missing or invalid authentication |

See the [Error Code Catalog](/api/errors) for the complete list.

## Get Server

```http
GET /api/v1/servers/{id}
```

Retrieves detailed information about a specific server, including current resource allocation and metrics.

### Path Parameters
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | Yes | Server ID (UUID format) |

### Example Request

::: code-group

```bash [curl]
curl -X GET https://api.esluce.com/api/v1/servers/srv_abc123 \
  -H "Authorization: Bearer ${ESCLUSE_API_KEY}"
```

```typescript [Node.js SDK]
const server = await client.servers.get('srv_abc123');
```

```python [Python SDK]
server = client.servers.get('srv_abc123')
```

:::

### Example Response

```json
{
  "data": {
    "id": "srv_abc123",
    "name": "Minecraft Server",
    "game_type": "minecraft",
    "status": "running",
    "ip": "192.168.1.100",
    "port": 25565,
    "resources": { "cpu": 2, "memory": "4GB", "disk": "50GB" },
    "metrics": { "cpu_usage": 45.2, "memory_usage": 62.1, "disk_usage": 23.5 }
  }
}
```

### Possible Errors

| HTTP | Code | Description |
|------|------|-------------|
| 404 | `SRV_NOT_FOUND` | Server with the specified ID does not exist |

## Create Server

```http
POST /api/v1/servers
```

Provisions a new game server. The server enters `creating` status and becomes `running` once provisioning completes.

### Request Body

```json
{
  "name": "Minecraft Server",
  "game_type": "minecraft",
  "node_id": "node_xyz",
  "resources": { "cpu": 2, "memory": "4GB" },
  "options": {
    "version": "1.20.4",
    "mc_loader": "paper",
    "eula_accepted": true
  }
}
```

### Example Request

::: code-group

```bash [curl]
curl -X POST https://api.esluce.com/api/v1/servers \
  -H "Authorization: Bearer ${ESCLUSE_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Minecraft Server",
    "game_type": "minecraft",
    "node_id": "node_xyz",
    "resources": { "cpu": 2, "memory": "4GB" },
    "options": { "version": "1.20.4", "mc_loader": "paper", "eula_accepted": true }
  }'
```

```typescript [Node.js SDK]
const server = await client.servers.create({
  name: 'Minecraft Server',
  gameType: 'minecraft',
  nodeId: 'node_xyz',
  resources: { cpu: 2, memory: '4GB' },
  options: { version: '1.20.4', mcLoader: 'paper', eulaAccepted: true }
});
```

```python [Python SDK]
server = client.servers.create(
  name='Minecraft Server',
  game_type='minecraft',
  node_id='node_xyz',
  resources={'cpu': 2, 'memory': '4GB'},
  options={'version': '1.20.4', 'mc_loader': 'paper', 'eula_accepted': True}
)
```

:::

### Example Response

```json
{
  "data": {
    "id": "srv_new123",
    "status": "creating",
    "estimated_time": 120
  }
}
```

### Possible Errors

| HTTP | Code | Description |
|------|------|-------------|
| 400 | `VAL_REQUIRED_FIELD` | Missing required fields (name, game_type, node_id) |
| 403 | `SRV_LIMIT_REACHED` | Maximum server count for current plan reached |
| 409 | `NODE_INSUFFICIENT_RESOURCES` | Selected node does not have enough resources |

## Update Server

```http
PUT /api/v1/servers/{id}
```

Updates a server's configuration. Not all fields may be updated while the server is running.

### Path Parameters
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | Yes | Server ID |

### Request Body
```json
{
  "name": "Renamed Server",
  "resources": { "cpu": 4, "memory": "8GB" }
}
```

### Possible Errors

| HTTP | Code | Description |
|------|------|-------------|
| 404 | `SRV_NOT_FOUND` | Server not found |
| 409 | `SRV_INVALID_STATUS` | Cannot update server in current state |

## Delete Server

```http
DELETE /api/v1/servers/{id}
```

Permanently deletes a server and all associated data. This action is irreversible.

⚠️ **Warning:** This action is irreversible. All data, including worlds, configurations, and backups, will be permanently removed.

### Query Parameters
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `confirm` | boolean | Yes | Must be `true` to confirm deletion |

### Example Request

::: code-group

```bash [curl]
curl -X DELETE "https://api.esluce.com/api/v1/servers/srv_abc123?confirm=true" \
  -H "Authorization: Bearer ${ESCLUSE_API_KEY}"
```

```typescript [Node.js SDK]
await client.servers.delete('srv_abc123');
```

```python [Python SDK]
client.servers.delete('srv_abc123')
```

:::

### Possible Errors

| HTTP | Code | Description |
|------|------|-------------|
| 400 | `VAL_REQUIRED_FIELD` | Missing `confirm=true` query parameter |
| 404 | `SRV_NOT_FOUND` | Server not found |

## Set Server Image

```http
POST /api/v1/servers/{id}/image
```

Updates the server's Docker image. Used to change game version or server software.

### Possible Errors

| HTTP | Code | Description |
|------|------|-------------|
| 409 | `SRV_INVALID_STATUS` | Server must be stopped to change image |

## Cleanup Servers

```http
POST /api/v1/servers/cleanup
```

Cleans up stale or orphaned server resources. Admin-level endpoint.

## Server Status Values

| Status | Description |
|--------|-------------|
| `creating` | Server being provisioned |
| `starting` | Server starting up |
| `running` | Server is online |
| `stopping` | Server shutting down |
| `stopped` | Server is offline |
| `error` | Server encountered an error |
| `deleting` | Server being removed |

## Next Steps

- [Server Operations](/api/servers/operations) — Start, stop, restart, kill, and monitor servers
- [Console & Logs](/api/servers/console) — Access server logs, console commands, and terminal
- [File Management](/api/servers/files) — Manage server files and directories
- [Error Codes](/api/errors) — Complete error reference

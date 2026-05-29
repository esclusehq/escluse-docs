# Nodes API

Manage game server nodes via the REST API.

## List Nodes

```http
GET /api/v1/nodes
```

Retrieves all nodes associated with your account.

### Query Parameters

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `page` | integer | No | 1 | Page number for pagination |
| `limit` | integer | No | 20 | Number of results per page |
| `status` | string | No | — | Filter by node status (`online`, `offline`, `degraded`, `pending`) |

### Example Request

::: code-group

```bash [curl]
curl -X GET https://api.esluce.com/api/v1/nodes \
  -H "Authorization: Bearer ${ESCLUSE_API_KEY}"
```

```typescript [Node.js SDK]
const nodes = await client.nodes.list();
```

```python [Python SDK]
nodes = client.nodes.list()
```

:::

### Example Response

```json
{
  "data": [
    {
      "id": "node_xyz",
      "name": "Production Node 1",
      "ip": "192.168.1.100",
      "status": "online",
      "server_count": 5,
      "uptime_hours": 720,
      "resources": {
        "total_cpu": 8,
        "total_memory": "32GB",
        "total_disk": "500GB"
      },
      "last_heartbeat": "2026-05-10T12:00:00Z"
    }
  ]
}
```

### Possible Errors

| HTTP | Code | Description |
|------|------|-------------|
| 401 | `UNAUTHORIZED` | Invalid or missing API key |

---

## Get Node

```http
GET /api/v1/nodes/{id}
```

Retrieves detailed information about a specific node.

### Path Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | Yes | Node ID (e.g., `node_xyz`) |

### Example Request

::: code-group

```bash [curl]
curl -X GET https://api.esluce.com/api/v1/nodes/node_xyz \
  -H "Authorization: Bearer ${ESCLUSE_API_KEY}"
```

```typescript [Node.js SDK]
const node = await client.nodes.get('node_xyz');
```

```python [Python SDK]
node = client.nodes.get('node_xyz')
```

:::

### Example Response

```json
{
  "data": {
    "id": "node_xyz",
    "name": "Production Node 1",
    "ip": "192.168.1.100",
    "status": "online",
    "version": "1.2.3",
    "server_count": 5,
    "uptime_hours": 720,
    "resources": {
      "available_cpu": 4,
      "available_memory": "16GB",
      "available_disk": "200GB"
    },
    "created_at": "2026-04-01T00:00:00Z",
    "last_heartbeat": "2026-05-10T12:00:00Z"
  }
}
```

### Possible Errors

| HTTP | Code | Description |
|------|------|-------------|
| 404 | `NODE_NOT_FOUND` | Node does not exist |

---

## Create Node

```http
POST /api/v1/nodes
```

Creates a new node and returns a pending registration status.

### Request Body

```json
{
  "name": "New Node",
  "api_key": "esk_xxx"
}
```

### Example Request

::: code-group

```bash [curl]
curl -X POST https://api.esluce.com/api/v1/nodes \
  -H "Authorization: Bearer ${ESCLUSE_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{"name": "New Node", "api_key": "esk_xxx"}'
```

```typescript [Node.js SDK]
const node = await client.nodes.create({
  name: 'New Node',
  apiKey: 'esk_xxx'
});
```

```python [Python SDK]
node = client.nodes.create(
  name='New Node',
  api_key='esk_xxx'
)
```

:::

### Example Response

```json
{
  "data": {
    "id": "node_new123",
    "name": "New Node",
    "status": "pending"
  }
}
```

### Possible Errors

| HTTP | Code | Description |
|------|------|-------------|
| 403 | `PLAN_LIMIT_EXCEEDED` | Max nodes reached for current plan |

---

## Update Node

```http
PATCH /api/v1/nodes/{id}
```

Updates node details such as name.

### Path Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | Yes | Node ID |

### Request Body

```json
{
  "name": "Updated Node Name"
}
```

### Example Request

::: code-group

```bash [curl]
curl -X PATCH https://api.esluce.com/api/v1/nodes/node_xyz \
  -H "Authorization: Bearer ${ESCLUSE_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{"name": "Updated Node Name"}'
```

```typescript [Node.js SDK]
const node = await client.nodes.update('node_xyz', {
  name: 'Updated Node Name'
});
```

```python [Python SDK]
node = client.nodes.update('node_xyz',
  name='Updated Node Name'
)
```

:::

### Possible Errors

| HTTP | Code | Description |
|------|------|-------------|
| 404 | `NODE_NOT_FOUND` | Node does not exist |

---

## Delete Node

```http
DELETE /api/v1/nodes/{id}
```

Permanently deletes a node and stops all servers running on it.

### Path Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | Yes | Node ID |

### Example Request

::: code-group

```bash [curl]
curl -X DELETE https://api.esluce.com/api/v1/nodes/node_xyz \
  -H "Authorization: Bearer ${ESCLUSE_API_KEY}"
```

```typescript [Node.js SDK]
await client.nodes.delete('node_xyz');
```

```python [Python SDK]
client.nodes.delete('node_xyz')
```

:::

### Possible Errors

| HTTP | Code | Description |
|------|------|-------------|
| 404 | `NODE_NOT_FOUND` | Node does not exist |
| 409 | `NODE_HAS_SERVERS` | Node still has running servers |

::: danger
Deleting a node will stop all servers running on it. This action is irreversible.
:::

---

## Online Nodes

```http
GET /api/v1/nodes/online
```

Returns a list of currently online nodes.

### Example Request

::: code-group

```bash [curl]
curl -X GET https://api.esluce.com/api/v1/nodes/online \
  -H "Authorization: Bearer ${ESCLUSE_API_KEY}"
```

```typescript [Node.js SDK]
const onlineNodes = await client.nodes.listOnline();
```

```python [Python SDK]
online_nodes = client.nodes.list_online()
```

:::

---

## Node Status

```http
PUT /api/v1/nodes/{id}/status/{status}
```

Updates the status of a node.

### Path Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | Yes | Node ID |
| `status` | string | Yes | New status (`online`, `offline`, `degraded`) |

---

## Node Metrics

```http
GET /api/v1/nodes/{id}/metrics
```

Returns current resource metrics for a node.

### Path Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | Yes | Node ID |

### Example Request

::: code-group

```bash [curl]
curl -X GET https://api.esluce.com/api/v1/nodes/node_xyz/metrics \
  -H "Authorization: Bearer ${ESCLUSE_API_KEY}"
```

```typescript [Node.js SDK]
const metrics = await client.nodes.getMetrics('node_xyz');
```

```python [Python SDK]
metrics = client.nodes.get_metrics('node_xyz')
```

:::

---

## Node Metrics History

```http
GET /api/v1/nodes/{id}/metrics/history/{limit}
```

Returns historical metrics data for a node.

### Path Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | Yes | Node ID |
| `limit` | integer | Yes | Number of historical data points |

---

## Node Health

```http
GET /api/v1/nodes/{id}/health
```

Returns health check status for a specific node.

### Path Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | Yes | Node ID |

---

## All Nodes Health

```http
GET /api/v1/nodes/health/all
```

Returns health status for all nodes.

---

## Unhealthy Nodes

```http
GET /api/v1/nodes/health/unhealthy
```

Returns a list of nodes currently reporting as unhealthy.

---

## Node Resources

```http
GET /api/v1/nodes/{id}/resources
```

Returns real-time resource usage for a specific node.

### Path Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | Yes | Node ID |

### Related Endpoints

For more advanced node management, see:
- [Node API Keys](/api/nodes/api-keys) — Manage node API keys
- [Node Registration](/api/nodes/registration) — Registration tokens and flow
- [Node Commands](/api/nodes/commands) — Command queue management
- [Node WebSocket](/api/nodes/websocket) — Real-time node communication protocol

## Node Status Values

| Status | Description |
|--------|-------------|
| `online` | Node connected and healthy |
| `offline` | Node disconnected |
| `degraded` | Node experiencing issues |
| `pending` | Node awaiting registration |

## Node Resources

The node agent reports real-time resource usage:

```json
{
  "resources": {
    "cpu": {
      "used": 3.2,
      "total": 8,
      "usage_percent": 40
    },
    "memory": {
      "used": "12GB",
      "total": "32GB",
      "usage_percent": 37.5
    },
    "disk": {
      "used": "250GB",
      "total": "500GB",
      "usage_percent": 50
    }
  }
}
```

## Node Heartbeat

Nodes send heartbeat signals every 30 seconds:

```json
{
  "type": "heartbeat",
  "node_id": "node_xyz",
  "timestamp": "2026-05-10T12:00:00Z",
  "resources": {...},
  "servers": [
    { "id": "srv_abc", "status": "running", "cpu": 12.5, "memory": "2GB" }
  ]
}
```

## Quotas

Node creation is limited by subscription plan:

| Plan | Max Nodes |
|------|-----------|
| Starter | 1 |
| Pro | 3 |
| Enterprise | Unlimited |
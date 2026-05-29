# Server Operations

Server lifecycle management endpoints: start, stop, restart, kill, status, health checks, and metrics.

## Start Server

```http
POST /api/v1/servers/{id}/start
```

Starts a stopped server. The server transitions through `starting` to `running` status.

### Path Parameters
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | Yes | Server ID |

### Example Request

::: code-group

```bash [curl]
curl -X POST https://api.esluce.com/api/v1/servers/srv_abc123/start \
  -H "Authorization: Bearer ${ESCLUSE_API_KEY}"
```

```typescript [Node.js SDK]
await client.servers.start('srv_abc123');
```

```python [Python SDK]
client.servers.start('srv_abc123')
```

:::

### Example Response
```json
{
  "data": { "id": "srv_abc123", "status": "starting" }
}
```

### Possible Errors
| HTTP | Code | Description |
|------|------|-------------|
| 409 | `SRV_INVALID_STATUS` | Server is already running or in a transitional state |
| 404 | `SRV_NOT_FOUND` | Server not found |

## Stop Server

```http
POST /api/v1/servers/{id}/stop
```

Gracefully stops a running server. Uses a 30-second grace period before force-stopping.

### Path Parameters
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | Yes | Server ID |

### Example Request

::: code-group

```bash [curl]
curl -X POST https://api.esluce.com/api/v1/servers/srv_abc123/stop \
  -H "Authorization: Bearer ${ESCLUSE_API_KEY}"
```

```typescript [Node.js SDK]
await client.servers.stop('srv_abc123');
```

```python [Python SDK]
client.servers.stop('srv_abc123')
```

:::

### Possible Errors
| HTTP | Code | Description |
|------|------|-------------|
| 409 | `SRV_INVALID_STATUS` | Server is already stopped or in a transitional state |

## Restart Server

```http
POST /api/v1/servers/{id}/restart
```

Restarts a running server. The server will briefly enter `stopping` → `starting` → `running`.

### Possible Errors
| HTTP | Code | Description |
|------|------|-------------|
| 409 | `SRV_INVALID_STATUS` | Server must be in `running` state to restart |

## Kill Server

```http
POST /api/v1/servers/{id}/kill
```

Force-kills a server immediately without graceful shutdown. Use only when the server is unresponsive.

⚠️ **Warning:** Force-killing may cause data loss. Use `stop` for graceful shutdown when possible.

### Possible Errors
| HTTP | Code | Description |
|------|------|-------------|
| 409 | `SRV_INVALID_STATUS` | Server must be in `running` or `starting` state |

## Get Server Status

```http
GET /api/v1/servers/{id}/status
```

Returns the current server status without the full server object.

### Example Response
```json
{
  "data": {
    "id": "srv_abc123",
    "status": "running",
    "uptime_seconds": 3600
  }
}
```

## Get Server Stats

```http
GET /api/v1/servers/{id}/stats
```

Returns real-time resource usage statistics for the server.

### Example Response
```json
{
  "data": {
    "cpu_usage": 45.2,
    "memory_usage": 62.1,
    "memory_used_mb": 2560,
    "disk_usage": 23.5,
    "disk_used_gb": 11.7,
    "players_online": 5
  }
}
```

## Server Health Check

```http
GET /api/v1/servers/{id}/health
```

Checks if the server is healthy and responsive.

## Health Restart

```http
POST /api/v1/servers/{id}/health-restart
```

Restarts the server only if health check indicates it is unresponsive. Used for automated recovery.

## Server Metrics

```http
GET /api/v1/servers/metrics
```

Aggregated metrics across all servers.

```http
GET /api/v1/servers/{id}/metrics
```

Detailed metrics for a specific server.

```http
GET /api/v1/servers/{id}/metrics/history/{limit}
```

Historical metrics data points.

### Path Parameters
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `limit` | integer | Yes | Number of historical data points to return (max 100) |

### Possible Errors
| HTTP | Code | Description |
|------|------|-------------|
| 404 | `SRV_NOT_FOUND` | Server not found |
| 503 | `NODE_OFFLINE` | Node hosting the server is offline |

### Related Pages
- [Servers API](/api/servers) — Server CRUD operations
- [Console & Logs](/api/servers/console) — Server logs and console commands
- [Error Codes](/api/errors) — Complete error code reference

# Console & Logs

Access server logs, send console commands, manage RCON connections, and interact with servers via WebSocket terminal.

## Server Logs

```http
GET /api/v1/servers/{id}/logs?tail=100
```

Retrieves recent log entries from the server console output.

### Query Parameters
| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `tail` | integer | No | 100 | Number of recent lines to return (max 1000) |

### Example Request

::: code-group

```bash [curl]
curl -X GET "https://api.esluce.com/api/v1/servers/srv_abc123/logs?tail=50" \
  -H "Authorization: Bearer ${ESCLUSE_API_KEY}"
```

```typescript [Node.js SDK]
const logs = await client.servers.getLogs('srv_abc123', { tail: 50 });
```

```python [Python SDK]
logs = client.servers.get_logs('srv_abc123', tail=50)
```

:::

### Example Response
```json
{
  "data": [
    { "timestamp": "2026-05-10T12:00:00Z", "level": "INFO", "message": "Done (22.123s)! For help, type \"help\"" }
  ]
}
```

### Possible Errors
| HTTP | Code | Description |
|------|------|-------------|
| 404 | `SRV_NOT_FOUND` | Server not found |

## Live Log Stream

```http
GET /api/v1/servers/{id}/logs/stream
```

WebSocket endpoint for streaming live server logs. Connects to the server's real-time log output.

Also available at:
- `wss://api.esluce.com/ws/docker-logs` — Docker-level log stream for all servers on a node
- `wss://api.esluce.com/ws/terminal/{server_id}` — Interactive terminal session

## Send Console Command

```http
POST /api/v1/servers/{id}/command
```

Sends a console command to a running server. The command is executed and the output is returned.

### Path Parameters
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | Yes | Server ID |

### Request Body
```json
{
  "command": "say Hello from Escluse!"
}
```

### Example Request

::: code-group

```bash [curl]
curl -X POST https://api.esluce.com/api/v1/servers/srv_abc123/command \
  -H "Authorization: Bearer ${ESCLUSE_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{"command": "say Hello from Escluse!"}'
```

```typescript [Node.js SDK]
const result = await client.servers.sendCommand('srv_abc123', {
  command: 'say Hello from Escluse!'
});
```

```python [Python SDK]
result = client.servers.send_command('srv_abc123', command='say Hello from Escluse!')
```

:::

### Possible Errors
| HTTP | Code | Description |
|------|------|-------------|
| 409 | `SRV_INVALID_STATUS` | Server must be running to accept commands |

## RCON

```http
POST /api/v1/servers/{id}/rcon
```

Executes a command via the RCON protocol. Returns the raw RCON response.

### Request Body
```json
{
  "command": "list"
}
```

## WebSocket Terminal

```http
GET /api/v1/servers/{id}/terminal
```

Opens an interactive WebSocket terminal session to the server. Requires WebSocket client library.

### Related Pages
- [Servers API](/api/servers) — Server CRUD operations
- [Error Codes](/api/errors) — Complete error code reference

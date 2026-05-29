# Node WebSocket Connection

Nodes communicate with the Escluse API via a persistent WebSocket connection. This enables real-time command dispatch, heartbeat reporting, and event streaming.

## Connection

```http
GET /api/ws/node
```

Establish a WebSocket connection for node communication. Requires node API key authentication.

### Headers

| Header | Value |
|--------|-------|
| `Authorization` | `Bearer esk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` |

### Authentication

The node must authenticate using its `esk_` prefixed API key in the `Authorization` header during the WebSocket handshake.

### Example Connection

```javascript
const ws = new WebSocket('wss://api.esluce.com/api/ws/node', {
  headers: {
    Authorization: 'Bearer esk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
  }
});
```

## Message Format

All WebSocket messages follow a JSON format:

```json
{
  "type": "message_type",
  "data": { ... },
  "timestamp": "2026-05-10T12:00:00Z"
}
```

## Node → API Messages

| Type | Description | Frequency |
|------|-------------|-----------|
| `heartbeat` | Node resource usage and server statuses | Every 30 seconds |
| `command_result` | Result of an executed command | On command completion |
| `server_event` | Server status change (started, stopped, crashed) | On event |
| `log_batch` | Batch of log entries from node servers | Configurable interval |

## API → Node Messages

| Type | Description |
|------|-------------|
| `execute_command` | Instructs the node to execute a command |
| `update_config` | Updates node configuration |
| `ping` | Keep-alive ping (node should respond with `pong`) |

## Heartbeat

The node sends a heartbeat every 30 seconds:

```json
{
  "type": "heartbeat",
  "data": {
    "node_id": "node_xyz",
    "resources": {
      "cpu": { "used": 3.2, "total": 8, "usage_percent": 40 },
      "memory": { "used": "12GB", "total": "32GB", "usage_percent": 37.5 },
      "disk": { "used": "250GB", "total": "500GB", "usage_percent": 50 }
    },
    "servers": [
      { "id": "srv_abc", "status": "running", "cpu": 12.5, "memory": "2GB" }
    ]
  }
}
```

## Reconnection

If the WebSocket connection drops, the node should:
1. Wait with exponential backoff (1s, 2s, 4s, 8s, max 60s)
2. Reconnect using the same API key
3. Resume normal operation

### Possible Errors

| HTTP | Code | Description |
|------|------|-------------|
| 401 | `NODE_KEY_INVALID` | Invalid or revoked API key |
| 403 | `NODE_UNAUTHORIZED` | Node not authorized for WebSocket connection |

### Related Pages

- [Nodes API](/api/nodes) — Node management
- [Node API Keys](/api/nodes/api-keys) — API key management
- [WebSocket Overview](/api/overview#websocket) — General WebSocket documentation

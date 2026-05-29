# Node Commands

Manage the command queue for compute nodes. Commands are sent to nodes for execution by the agent.

## Queue Command

```http
POST /api/v1/nodes/{id}/commands
```

Queues a command for the node agent to execute. The agent picks up pending commands on its next poll cycle.

### Path Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | Yes | Node ID |

### Request Body

```json
{
  "command": "restart_server",
  "params": {
    "server_id": "srv_abc123"
  }
}
```

### Example Request

::: code-group

```bash [curl]
curl -X POST https://api.esluce.com/api/v1/nodes/node_abc123/commands \
  -H "Authorization: Bearer ${ESCLUSE_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{"command": "restart_server", "params": {"server_id": "srv_abc123"}}'
```

```typescript [Node.js SDK]
await client.nodes.queueCommand('node_abc123', {
  command: 'restart_server',
  params: { serverId: 'srv_abc123' }
});
```

```python [Python SDK]
client.nodes.queue_command('node_abc123',
  command='restart_server',
  params={'server_id': 'srv_abc123'}
)
```

:::

## Submit Command Result

```http
POST /api/v1/nodes/{id}/commands/result
```

Called by the node agent to submit the result of a completed command.

### Path Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | Yes | Node ID |

### Request Body

```json
{
  "command_id": "cmd_abc123",
  "status": "completed",
  "output": "Server restarted successfully"
}
```

### Example Request

::: code-group

```bash [curl]
curl -X POST https://api.esluce.com/api/v1/nodes/node_abc123/commands/result \
  -H "Authorization: Bearer ${ESCLUSE_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{"command_id": "cmd_abc123", "status": "completed", "output": "Server restarted successfully"}'
```

```typescript [Node.js SDK]
await client.nodes.submitCommandResult('node_abc123', {
  commandId: 'cmd_abc123',
  status: 'completed',
  output: 'Server restarted successfully'
});
```

```python [Python SDK]
client.nodes.submit_command_result('node_abc123',
  command_id='cmd_abc123',
  status='completed',
  output='Server restarted successfully'
)
```

:::

### Possible Errors

| HTTP | Code | Description |
|------|------|-------------|
| 404 | `NODE_NOT_FOUND` | Node does not exist |
| 503 | `NODE_OFFLINE` | Node is offline (command result may still be processed) |

### Related Pages

- [Nodes API](/api/nodes) — Node management
- [Node WebSocket](/api/nodes/websocket) — Real-time node communication
- [Node API Keys](/api/nodes/api-keys) — API key management

# Cron Tasks

Schedule automated server tasks (start, stop, restart, commands) on a recurring basis.

## List Cron Tasks

```http
GET /api/v1/servers/{server_id}/tasks
```

Retrieves all scheduled tasks for a server.

## Create Cron Task

```http
POST /api/v1/servers/{server_id}/tasks
```

Creates a new scheduled task with a cron expression.

### Request Body
```json
{
  "name": "Daily Restart",
  "action": "restart",
  "cron_expression": "0 4 * * *",
  "enabled": true
}
```

### Example Request

::: code-group

```bash [curl]
curl -X POST https://api.esluce.com/api/v1/servers/srv_abc123/tasks \
  -H "Authorization: Bearer ${ESCLUSE_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{"name": "Daily Restart", "action": "restart", "cron_expression": "0 4 * * *", "enabled": true}'
```

```typescript [Node.js SDK]
await client.servers.createTask('srv_abc123', {
  name: 'Daily Restart',
  action: 'restart',
  cronExpression: '0 4 * * *',
  enabled: true
});
```

```python [Python SDK]
client.servers.create_task('srv_abc123',
  name='Daily Restart',
  action='restart',
  cron_expression='0 4 * * *',
  enabled=True
)
```

:::

## Update Cron Task

```http
PATCH /api/v1/servers/{server_id}/tasks/{task_id}
```

Updates an existing scheduled task.

## Delete Cron Task

```http
DELETE /api/v1/servers/{server_id}/tasks/{task_id}
```

Removes a scheduled task.

## Run Cron Task Now

```http
POST /api/v1/servers/{server_id}/tasks/{task_id}/run
```

Triggers a task immediately, regardless of its schedule.

### Possible Errors

| HTTP | Code | Description |
|------|------|-------------|
| 400 | `VAL_INVALID_FORMAT` | Invalid cron expression format |
| 404 | `SRV_NOT_FOUND` | Server not found |

### Related Pages
- [Servers API](/api/servers) — Server CRUD operations
- [Error Codes](/api/errors) — Complete error code reference

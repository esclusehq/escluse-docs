# Backups

Manage server backups via the REST API. Backups can be created on-demand and restored to recover server data.

All endpoints are prefixed with `/api/v1/servers/{id}/backups`.

## List Backups

```http
GET /api/v1/servers/{id}/backups
```

Retrieves all backups for a server.

### Path Parameters
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | Yes | Server ID |

### Example Request

::: code-group

```bash [curl]
curl -X GET https://api.esluce.com/api/v1/servers/srv_abc123/backups \
  -H "Authorization: Bearer ${ESCLUSE_API_KEY}"
```

```typescript [Node.js SDK]
const backups = await client.servers.listBackups('srv_abc123');
```

```python [Python SDK]
backups = client.servers.list_backups('srv_abc123')
```

:::

### Example Response
```json
{
  "data": [
    {
      "id": "bkp_abc123",
      "size_mb": 256,
      "status": "completed",
      "created_at": "2026-05-10T04:00:00Z"
    }
  ]
}
```

### Possible Errors
| HTTP | Code | Description |
|------|------|-------------|
| 404 | `SRV_NOT_FOUND` | Server not found |

---

## Create Backup

```http
POST /api/v1/servers/{id}/backups
```

Creates a new manual backup of the server's data.

### Path Parameters
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | Yes | Server ID |

### Request Body
```json
{
  "label": "Before Update v1.21"
}
```

### Example Request

::: code-group

```bash [curl]
curl -X POST https://api.esluce.com/api/v1/servers/srv_abc123/backups \
  -H "Authorization: Bearer ${ESCLUSE_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{"label": "Before Update v1.21"}'
```

```typescript [Node.js SDK]
const backup = await client.servers.createBackup('srv_abc123', {
  label: 'Before Update v1.21'
});
```

```python [Python SDK]
backup = client.servers.create_backup('srv_abc123', label='Before Update v1.21')
```

:::

### Example Response
```json
{
  "data": {
    "id": "bkp_abc123",
    "size_mb": 0,
    "status": "creating",
    "created_at": "2026-05-10T04:00:00Z"
  }
}
```

### Possible Errors
| HTTP | Code | Description |
|------|------|-------------|
| 404 | `SRV_NOT_FOUND` | Server not found |
| 409 | `SRV_INVALID_STATUS` | Server must be stopped or running to create a backup |

---

## Delete Backup

```http
DELETE /api/v1/servers/{id}/backups/{backup_id}
```

Permanently removes a backup.

⚠️ **Warning:** This action is irreversible.

### Path Parameters
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | Yes | Server ID |
| `backup_id` | string | Yes | Backup ID |

### Possible Errors
| HTTP | Code | Description |
|------|------|-------------|
| 404 | `SRV_NOT_FOUND` | Server not found |
| 404 | `BKP_NOT_FOUND` | Backup not found |

---

## Restore Backup

```http
POST /api/v1/servers/{id}/backups/{backup_id}/restore
```

Restores server data from a backup. The server will be stopped during restoration.

⚠️ **Warning:** The server will be stopped during restoration. Current data will be replaced with the backup contents.

### Path Parameters
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | Yes | Server ID |
| `backup_id` | string | Yes | Backup ID |

### Example Request

::: code-group

```bash [curl]
curl -X POST https://api.esluce.com/api/v1/servers/srv_abc123/backups/bkp_abc123/restore \
  -H "Authorization: Bearer ${ESCLUSE_API_KEY}"
```

```typescript [Node.js SDK]
await client.servers.restoreBackup('srv_abc123', 'bkp_abc123');
```

```python [Python SDK]
client.servers.restore_backup('srv_abc123', 'bkp_abc123')
```

:::

### Example Response
```json
{
  "data": {
    "id": "srv_abc123",
    "status": "restoring",
    "restoring_from": "bkp_abc123"
  }
}
```

### Possible Errors
| HTTP | Code | Description |
|------|------|-------------|
| 404 | `SRV_NOT_FOUND` | Server not found |
| 404 | `BKP_NOT_FOUND` | Backup not found |
| 409 | `SRV_INVALID_STATUS` | Server must be stopped to restore |
| 409 | `RESTORE_IN_PROGRESS` | A restore operation is already in progress |

### Related Pages
- [Servers API](/api/servers) — Server CRUD operations
- [Error Codes](/api/errors) — Complete error code reference

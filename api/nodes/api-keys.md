# Node API Keys

Manage node API keys for agent-to-API authentication. Node API keys use the `esk_` prefix and are used for node registration and communication.

## List API Keys

```http
GET /api/v1/nodes/{id}/keys
```

Retrieves all API keys for a specific node.

### Path Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | Yes | Node ID |

### Example Request

::: code-group

```bash [curl]
curl -X GET https://api.esluce.com/api/v1/nodes/node_abc123/keys \
  -H "Authorization: Bearer ${ESCLUSE_API_KEY}"
```

```typescript [Node.js SDK]
const keys = await client.nodes.listKeys('node_abc123');
```

```python [Python SDK]
keys = client.nodes.list_keys('node_abc123')
```

:::

## Generate API Key

```http
POST /api/v1/nodes/{id}/generate-key
```

Creates a new API key for node authentication.

### Path Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | Yes | Node ID |

### Example Request

::: code-group

```bash [curl]
curl -X POST https://api.esluce.com/api/v1/nodes/node_abc123/generate-key \
  -H "Authorization: Bearer ${ESCLUSE_API_KEY}"
```

```typescript [Node.js SDK]
const key = await client.nodes.generateKey('node_abc123');
```

```python [Python SDK]
key = client.nodes.generate_key('node_abc123')
```

:::

### Example Response

```json
{
  "data": {
    "id": "key_abc123",
    "key": "esk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "label": "default",
    "created_at": "2026-05-10T12:00:00Z"
  }
}
```

## Revoke API Key

```http
PUT /api/v1/nodes/{node_id}/keys/{key_id}/revoke
```

Revokes an API key, immediately invalidating it.

### Path Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `node_id` | string | Yes | Node ID |
| `key_id` | string | Yes | API key ID |

### Example Request

::: code-group

```bash [curl]
curl -X PUT https://api.esluce.com/api/v1/nodes/node_abc123/keys/key_abc123/revoke \
  -H "Authorization: Bearer ${ESCLUSE_API_KEY}"
```

```typescript [Node.js SDK]
await client.nodes.revokeKey('node_abc123', 'key_abc123');
```

```python [Python SDK]
client.nodes.revoke_key('node_abc123', 'key_abc123')
```

:::

## Delete API Key

```http
DELETE /api/v1/nodes/{node_id}/keys/{key_id}
```

Permanently removes an API key.

### Path Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `node_id` | string | Yes | Node ID |
| `key_id` | string | Yes | API key ID |

### Example Request

::: code-group

```bash [curl]
curl -X DELETE https://api.esluce.com/api/v1/nodes/node_abc123/keys/key_abc123 \
  -H "Authorization: Bearer ${ESCLUSE_API_KEY}"
```

```typescript [Node.js SDK]
await client.nodes.deleteKey('node_abc123', 'key_abc123');
```

```python [Python SDK]
client.nodes.delete_key('node_abc123', 'key_abc123')
```

:::

### Possible Errors

| HTTP | Code | Description |
|------|------|-------------|
| 404 | `NODE_NOT_FOUND` | Node does not exist |
| 401 | `NODE_KEY_INVALID` | API key not found or already revoked |

### Related Pages

- [Authentication Guide](/api/auth) — How to use API keys for authentication
- [Nodes API](/api/nodes) — Node management
- [Node Registration](/api/nodes/registration) — Registration tokens

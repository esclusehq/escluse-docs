# Node Registration

Register new compute nodes and manage registration tokens.

## Registration Flow

1. Generate a registration token for a node: `POST /api/v1/nodes/{id}/tokens`
2. On the target machine, run the agent with the registration token
3. The agent connects to the API and completes registration
4. The node appears in your node list

## List Registration Tokens

```http
GET /api/v1/nodes/{id}/tokens
```

Retrieves all registration tokens for a specific node.

### Path Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | Yes | Node ID |

### Example Request

::: code-group

```bash [curl]
curl -X GET https://api.esluce.com/api/v1/nodes/node_abc123/tokens \
  -H "Authorization: Bearer ${ESCLUSE_API_KEY}"
```

```typescript [Node.js SDK]
const tokens = await client.nodes.listTokens('node_abc123');
```

```python [Python SDK]
tokens = client.nodes.list_tokens('node_abc123')
```

:::

## Create Registration Token

```http
POST /api/v1/nodes/{id}/tokens
```

Creates a new registration token for node enrollment.

### Path Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | Yes | Node ID |

### Request Body

```json
{
  "label": "Production Node 2"
}
```

### Example Request

::: code-group

```bash [curl]
curl -X POST https://api.esluce.com/api/v1/nodes/node_abc123/tokens \
  -H "Authorization: Bearer ${ESCLUSE_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{"label": "Production Node 2"}'
```

```typescript [Node.js SDK]
const token = await client.nodes.createToken('node_abc123', {
  label: 'Production Node 2'
});
```

```python [Python SDK]
token = client.nodes.create_token('node_abc123',
  label='Production Node 2'
)
```

:::

## Delete Registration Token

```http
DELETE /api/v1/nodes/{id}/tokens/{token_id}
```

Permanently removes a registration token.

### Path Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | Yes | Node ID |
| `token_id` | string | Yes | Token ID |

### Example Request

::: code-group

```bash [curl]
curl -X DELETE https://api.esluce.com/api/v1/nodes/node_abc123/tokens/tok_abc123 \
  -H "Authorization: Bearer ${ESCLUSE_API_KEY}"
```

```typescript [Node.js SDK]
await client.nodes.deleteToken('node_abc123', 'tok_abc123');
```

```python [Python SDK]
client.nodes.delete_token('node_abc123', 'tok_abc123')
```

:::

## Register Node

```http
POST /api/v1/nodes/register
```

Registers a new node using a registration token and API key. Called by the node agent during setup.

### Request Body

```json
{
  "name": "My Node",
  "registration_token": "tok_abc123",
  "api_key": "esk_xxx"
}
```

### Example Request

::: code-group

```bash [curl]
curl -X POST https://api.esluce.com/api/v1/nodes/register \
  -H "Authorization: Bearer ${ESCLUSE_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{"name": "My Node", "registration_token": "tok_abc123", "api_key": "esk_xxx"}'
```

```typescript [Node.js SDK]
const node = await client.nodes.register({
  name: 'My Node',
  registrationToken: 'tok_abc123',
  apiKey: 'esk_xxx'
});
```

```python [Python SDK]
node = client.nodes.register(
  name='My Node',
  registration_token='tok_abc123',
  api_key='esk_xxx'
)
```

:::

### Possible Errors

| HTTP | Code | Description |
|------|------|-------------|
| 401 | `NODE_KEY_INVALID` | Invalid or revoked API key |
| 404 | `TOKEN_NOT_FOUND` | Invalid registration token |

### Related Pages

- [Nodes API](/api/nodes) — Node management
- [Node API Keys](/api/nodes/api-keys) — API key management

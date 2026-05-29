# Server Templates

Pre-configured server templates for quick deployment. Templates define the server configuration, game type, resource allocation, and options.

## List Server Templates

```http
GET /api/v1/templates
```

Retrieves all available server templates.

### Example Response
```json
{
  "data": [
    {
      "id": "tpl_abc123",
      "name": "Minecraft Paper 1.20.4",
      "game_type": "minecraft",
      "description": "Optimized Minecraft server with PaperMC",
      "resources": { "cpu": 2, "memory": "4GB" }
    }
  ]
}
```

### Example Request

::: code-group

```bash [curl]
curl -X GET https://api.esluce.com/api/v1/templates \
  -H "Authorization: Bearer ${ESCLUSE_API_KEY}"
```

```typescript [Node.js SDK]
const templates = await client.templates.list();
```

```python [Python SDK]
templates = client.templates.list()
```

:::

### Possible Errors
| HTTP | Code | Description |
|------|------|-------------|
| 401 | `AUTH_TOKEN_INVALID` | Authentication required |

### Related Pages
- [Plugin Templates](/api/templates/plugins) — Plugin template bundles
- [Modpack Templates](/api/templates/modpacks) — Modpack configuration templates
- [Servers API](/api/servers) — Server creation using templates
- [Error Codes](/api/errors) — Complete error code reference

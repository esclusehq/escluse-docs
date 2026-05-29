# Server Properties

Manage server configuration properties (e.g., `server.properties`, `bukkit.yml`).

## Get Properties

```http
GET /api/v1/servers/{id}/properties
```

Retrieves the current server properties as a key-value object.

### Example Response
```json
{
  "data": {
    "server-port": 25565,
    "max-players": 20,
    "motd": "A Minecraft Server",
    "difficulty": "easy",
    "gamemode": "survival",
    "pvp": true,
    "online-mode": true
  }
}
```

## Update Properties

```http
PATCH /api/v1/servers/{id}/properties
```

Updates specific server properties. Only provided fields are updated.

### Request Body
```json
{
  "max-players": 30,
  "motd": "Welcome to my server!",
  "difficulty": "normal"
}
```

### Example Request

::: code-group

```bash [curl]
curl -X PATCH https://api.esluce.com/api/v1/servers/srv_abc123/properties \
  -H "Authorization: Bearer ${ESCLUSE_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{"max-players": 30, "motd": "Welcome!"}'
```

```typescript [Node.js SDK]
await client.servers.updateProperties('srv_abc123', {
  maxPlayers: 30,
  motd: 'Welcome!'
});
```

```python [Python SDK]
client.servers.update_properties('srv_abc123', max_players=30, motd='Welcome!')
```

:::

### Possible Errors
| HTTP | Code | Description |
|------|------|-------------|
| 400 | `VAL_INVALID_FORMAT` | Invalid property value format |
| 404 | `SRV_NOT_FOUND` | Server not found |

### Related Pages
- [Servers API](/api/servers) — Server CRUD operations
- [Error Codes](/api/errors) — Complete error code reference

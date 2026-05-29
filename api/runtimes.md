# Runtimes API

List available server runtimes and game types supported by the platform.

## List Runtimes

```http
GET /api/v1/runtimes
```

Retrieves all available server runtimes and their supported game versions.

### Example Response
```json
{
  "data": [
    {
      "id": "minecraft",
      "name": "Minecraft",
      "versions": ["1.20.4", "1.20.1", "1.19.4"],
      "loaders": ["vanilla", "paper", "fabric", "forge"],
      "default_version": "1.20.4",
      "icon": "https://cdn.esluce.com/icons/minecraft.png"
    },
    {
      "id": "bedrock",
      "name": "Minecraft Bedrock",
      "versions": ["1.20.70", "1.20.60"],
      "loaders": ["vanilla"],
      "default_version": "1.20.70"
    }
  ]
}
```

### Possible Errors
| HTTP | Code | Description |
|------|------|-------------|
| 401 | `AUTH_TOKEN_INVALID` | Authentication required |

### Related Pages
- [Servers API](/api/servers) — Create server with specific runtime
- [Error Codes](/api/errors) — Complete error code reference

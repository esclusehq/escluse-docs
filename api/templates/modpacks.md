# Modpack Templates

Pre-configured modpack templates for modded Minecraft and other supported games.

## List Modpack Templates

```http
GET /api/v1/modpack-templates
```

Retrieves all available modpack templates.

### Example Response
```json
{
  "data": [
    {
      "id": "mptpl_abc123",
      "name": "FTB Revelations",
      "game_type": "minecraft",
      "version": "1.12.2",
      "mod_count": 180,
      "description": "The flagship FTB modpack"
    }
  ]
}
```

### Related Pages
- [Server Templates](/api/templates/server) — Server deployment templates
- [Error Codes](/api/errors) — Complete error code reference

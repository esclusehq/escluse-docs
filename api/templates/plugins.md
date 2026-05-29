# Plugin Templates

Pre-configured plugin bundles that can be installed on servers with a single click.

## List Plugin Templates

```http
GET /api/v1/plugin-templates
```

Retrieves all available plugin template bundles.

### Example Response
```json
{
  "data": [
    {
      "id": "ptpl_abc123",
      "name": "Essential Protections",
      "description": "Anti-grief, permissions, and protective plugins",
      "plugins": [
        { "id": "plg_001", "name": "WorldGuard" },
        { "id": "plg_002", "name": "GriefPrevention" }
      ]
    }
  ]
}
```

### Related Pages
- [Server Templates](/api/templates/server) — Server deployment templates
- [Servers API - Plugins](/api/servers/plugins) — Per-server plugin management

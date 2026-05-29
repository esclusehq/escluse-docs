# Plugins

Manage server plugins via the REST API. Includes server-specific plugin operations plus global plugin marketplace search.

## List Plugins

```http
GET /api/v1/servers/{id}/plugins
```

Retrieves all installed plugins for a server.

### Path Parameters
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | Yes | Server ID |

### Example Request

::: code-group

```bash [curl]
curl -X GET https://api.esluce.com/api/v1/servers/srv_abc123/plugins \
  -H "Authorization: Bearer ${ESCLUSE_API_KEY}"
```

```typescript [Node.js SDK]
const plugins = await client.servers.listPlugins('srv_abc123');
```

```python [Python SDK]
plugins = client.servers.list_plugins('srv_abc123')
```

:::

### Example Response
```json
{
  "data": [
    {
      "id": "plg_abc123",
      "name": "EssentialsX",
      "version": "2.20.1",
      "enabled": true,
      "game_type": "minecraft"
    }
  ]
}
```

### Possible Errors
| HTTP | Code | Description |
|------|------|-------------|
| 404 | `SRV_NOT_FOUND` | Server not found |

---

## Install Plugin

```http
POST /api/v1/servers/{id}/plugins/install
```

Installs a plugin from the marketplace.

### Path Parameters
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | Yes | Server ID |

### Request Body
```json
{
  "plugin_id": "plg_abc123",
  "version": "2.20.1"
}
```

### Example Request

::: code-group

```bash [curl]
curl -X POST https://api.esluce.com/api/v1/servers/srv_abc123/plugins/install \
  -H "Authorization: Bearer ${ESCLUSE_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{"plugin_id": "plg_abc123", "version": "2.20.1"}'
```

```typescript [Node.js SDK]
await client.servers.installPlugin('srv_abc123', {
  pluginId: 'plg_abc123',
  version: '2.20.1'
});
```

```python [Python SDK]
client.servers.install_plugin('srv_abc123', plugin_id='plg_abc123', version='2.20.1')
```

:::

### Example Response
```json
{
  "data": {
    "id": "plg_abc123",
    "name": "EssentialsX",
    "version": "2.20.1",
    "status": "installing"
  }
}
```

### Possible Errors
| HTTP | Code | Description |
|------|------|-------------|
| 404 | `SRV_NOT_FOUND` | Server not found |
| 409 | `SRV_INVALID_STATUS` | Server must be stopped to install plugins |

---

## Toggle Plugin

```http
POST /api/v1/servers/{id}/plugins/toggle
```

Enables or disables a plugin without uninstalling it.

### Path Parameters
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | Yes | Server ID |

### Request Body
```json
{
  "plugin_id": "plg_abc123",
  "enabled": false
}
```

### Example Request

::: code-group

```bash [curl]
curl -X POST https://api.esluce.com/api/v1/servers/srv_abc123/plugins/toggle \
  -H "Authorization: Bearer ${ESCLUSE_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{"plugin_id": "plg_abc123", "enabled": false}'
```

```typescript [Node.js SDK]
await client.servers.togglePlugin('srv_abc123', {
  pluginId: 'plg_abc123',
  enabled: false
});
```

```python [Python SDK]
client.servers.toggle_plugin('srv_abc123', plugin_id='plg_abc123', enabled=False)
```

:::

### Possible Errors
| HTTP | Code | Description |
|------|------|-------------|
| 404 | `SRV_NOT_FOUND` or plugin not found |

---

## Uninstall Plugin

```http
DELETE /api/v1/servers/{id}/plugins
```

Permanently removes a plugin from the server.

⚠️ **Warning:** This action is irreversible. Plugin configuration will be lost.

### Path Parameters
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | Yes | Server ID |

### Query Parameters
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `plugin_id` | string | Yes | Plugin ID to uninstall |

### Possible Errors
| HTTP | Code | Description |
|------|------|-------------|
| 404 | `SRV_NOT_FOUND` | Server not found |
| 404 | `PLUGIN_NOT_FOUND` | Plugin not found on this server |

---

## Install Template

```http
POST /api/v1/servers/{id}/plugins/install-template
```

Installs a predefined plugin template (bundle of plugins) onto the server.

### Path Parameters
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | Yes | Server ID |

### Request Body
```json
{
  "template_id": "tpl_abc123"
}
```

### Possible Errors
| HTTP | Code | Description |
|------|------|-------------|
| 404 | `SRV_NOT_FOUND` | Server not found |
| 404 | `TPL_NOT_FOUND` | Template not found |

---

## Search Plugins

```http
GET /api/v1/plugins/search
```

Searches the global plugin marketplace for available plugins.

### Query Parameters
| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `q` | string | Yes | — | Search query |
| `game_type` | string | No | — | Filter by game type (e.g., `minecraft`, `palworld`) |

### Example Request

::: code-group

```bash [curl]
curl -X GET "https://api.esluce.com/api/v1/plugins/search?q=Essentials&game_type=minecraft" \
  -H "Authorization: Bearer ${ESCLUSE_API_KEY}"
```

```typescript [Node.js SDK]
const results = await client.plugins.search({
  q: 'Essentials',
  gameType: 'minecraft'
});
```

```python [Python SDK]
results = client.plugins.search(q='Essentials', game_type='minecraft')
```

:::

### Example Response
```json
{
  "data": [
    {
      "id": "plg_abc123",
      "name": "EssentialsX",
      "description": "Essential server management commands",
      "game_type": "minecraft",
      "version": "2.20.1",
      "downloads": 500000
    }
  ]
}
```

---

## Get Plugin Versions

```http
GET /api/v1/plugins/{project_id}/versions
```

Retrieves available versions for a specific plugin.

### Path Parameters
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `project_id` | string | Yes | Plugin project ID |

### Example Response
```json
{
  "data": [
    { "version": "2.20.1", "published_at": "2026-04-15T10:00:00Z" },
    { "version": "2.19.0", "published_at": "2026-03-01T08:00:00Z" }
  ]
}
```

### Possible Errors
| HTTP | Code | Description |
|------|------|-------------|
| 404 | `SRV_NOT_FOUND` | Server not found |
| 409 | `SRV_INVALID_STATUS` | Server must be stopped to modify plugins |

### Related Pages
- [Servers API](/api/servers) — Server CRUD operations
- [Plugin Templates](/api/templates/plugins) — Pre-configured plugin bundles
- [Error Codes](/api/errors) — Complete error code reference

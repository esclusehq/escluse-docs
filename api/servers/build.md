# Build System

Build server code directly on the node. Supports Maven, Gradle, npm, and other build systems for development mode.

All endpoints are prefixed with `/api/v1/servers/{id}/build` unless otherwise noted.

## Detect Build System

```http
GET /api/v1/servers/{id}/build/detect
```

Detects the build system used by the server project. Checks for common build tool configuration files.

### Path Parameters
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | Yes | Server ID |

### Example Request

::: code-group

```bash [curl]
curl -X GET https://api.esluce.com/api/v1/servers/srv_abc123/build/detect \
  -H "Authorization: Bearer ${ESCLUSE_API_KEY}"
```

```typescript [Node.js SDK]
const detected = await client.servers.detectBuildSystem('srv_abc123');
```

```python [Python SDK]
detected = client.servers.detect_build_system('srv_abc123')
```

:::

### Example Response
```json
{
  "data": {
    "system": "maven",
    "detected_at": "/pom.xml",
    "version": "3.9.6",
    "recommended_command": "mvn clean package"
  }
}
```

### Possible Errors
| HTTP | Code | Description |
|------|------|-------------|
| 404 | `SRV_NOT_FOUND` | Server not found |
| 404 | `BUILD_SYSTEM_NOT_FOUND` | No recognizable build system detected |

---

## Execute Build

```http
POST /api/v1/servers/{id}/build
```

Starts a build process. Returns the build ID for status tracking.

### Path Parameters
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | Yes | Server ID |

### Request Body
```json
{
  "command": "mvn clean package",
  "auto_deploy": true
}
```

### Example Request

::: code-group

```bash [curl]
curl -X POST https://api.esluce.com/api/v1/servers/srv_abc123/build \
  -H "Authorization: Bearer ${ESCLUSE_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{"command": "mvn clean package", "auto_deploy": true}'
```

```typescript [Node.js SDK]
const build = await client.servers.executeBuild('srv_abc123', {
  command: 'mvn clean package',
  autoDeploy: true
});
```

```python [Python SDK]
build = client.servers.execute_build('srv_abc123', command='mvn clean package', auto_deploy=True)
```

:::

### Example Response
```json
{
  "data": {
    "build_id": "bld_abc123",
    "status": "running",
    "started_at": "2026-05-10T12:00:00Z"
  }
}
```

### Possible Errors
| HTTP | Code | Description |
|------|------|-------------|
| 404 | `SRV_NOT_FOUND` | Server not found |
| 409 | `BUILD_IN_PROGRESS` | A build is already running |

---

## Build WebSocket

```http
GET /api/v1/servers/{id}/build/ws
```

WebSocket endpoint for live build log streaming. Connects to real-time build output.

### Path Parameters
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | Yes | Server ID |

### Example (JavaScript Client)
```javascript
const ws = new WebSocket('wss://api.esluce.com/api/v1/servers/srv_abc123/build/ws');
ws.onmessage = (event) => {
  console.log('Build output:', event.data);
};
```

### Possible Errors
| HTTP | Code | Description |
|------|------|-------------|
| 404 | `SRV_NOT_FOUND` | Server not found |

---

## Build Status

```http
GET /api/v1/servers/{id}/build/status
```

Returns the current or last build status.

### Path Parameters
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | Yes | Server ID |

### Example Response
```json
{
  "data": {
    "build_id": "bld_abc123",
    "status": "completed",
    "success": true,
    "duration_seconds": 45,
    "completed_at": "2026-05-10T12:00:45Z",
    "output_summary": "BUILD SUCCESS"
  }
}
```

### Possible Errors
| HTTP | Code | Description |
|------|------|-------------|
| 404 | `SRV_NOT_FOUND` | Server not found |
| 404 | `BUILD_NOT_FOUND` | No builds have been executed |

---

## Hot Reload

```http
POST /api/v1/servers/{id}/hot-reload
```

Hot-reloads the server after a successful build (development mode). Applies changes without a full restart.

### Path Parameters
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | Yes | Server ID |

### Example Request

::: code-group

```bash [curl]
curl -X POST https://api.esluce.com/api/v1/servers/srv_abc123/hot-reload \
  -H "Authorization: Bearer ${ESCLUSE_API_KEY}"
```

```typescript [Node.js SDK]
await client.servers.hotReload('srv_abc123');
```

```python [Python SDK]
client.servers.hot_reload('srv_abc123')
```

:::

### Possible Errors
| HTTP | Code | Description |
|------|------|-------------|
| 404 | `SRV_NOT_FOUND` | Server not found |
| 409 | `SRV_INVALID_STATUS` | Server must be running to hot-reload |
| 409 | `BUILD_REQUIRED` | No successful build available to reload |

### Related Pages
- [Servers API](/api/servers) — Server CRUD operations
- [Git Operations](/api/servers/git) — Source code management
- [Error Codes](/api/errors) — Complete error code reference

# Deployment

Deploy server builds, manage deployment history, and roll back to previous versions. Supports direct deployment and Modrinth integration.

Server deployment endpoints are prefixed with `/api/v1/servers/{id}/deploy`. Global deploy endpoints are under `/api/v1/deploy`.

## Deploy Server

```http
POST /api/v1/servers/{id}/deploy
```

Deploys a build artifact to the server. The server will restart with the new version.

### Path Parameters
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | Yes | Server ID |

### Request Body
```json
{
  "artifact_id": "art_abc123"
}
```

### Example Request

::: code-group

```bash [curl]
curl -X POST https://api.esluce.com/api/v1/servers/srv_abc123/deploy \
  -H "Authorization: Bearer ${ESCLUSE_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{"artifact_id": "art_abc123"}'
```

```typescript [Node.js SDK]
await client.servers.deploy('srv_abc123', {
  artifactId: 'art_abc123'
});
```

```python [Python SDK]
client.servers.deploy('srv_abc123', artifact_id='art_abc123')
```

:::

### Example Response
```json
{
  "data": {
    "deployment_id": "dep_abc123",
    "status": "deploying",
    "artifact_id": "art_abc123",
    "started_at": "2026-05-10T12:00:00Z"
  }
}
```

### Possible Errors
| HTTP | Code | Description |
|------|------|-------------|
| 404 | `SRV_NOT_FOUND` | Server not found |
| 400 | `DEPLOY_ARTIFACT_NOT_FOUND` | Specified artifact does not exist |

---

## Deployment History

```http
GET /api/v1/servers/{id}/deploy/history
```

Retrieves the deployment history for a server.

### Path Parameters
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | Yes | Server ID |

### Example Response
```json
{
  "data": [
    {
      "id": "dep_abc123",
      "version": "v2.1.0",
      "status": "successful",
      "deployed_at": "2026-05-10T12:00:00Z",
      "rolled_back": false
    }
  ]
}
```

### Possible Errors
| HTTP | Code | Description |
|------|------|-------------|
| 404 | `SRV_NOT_FOUND` | Server not found |

---

## Deployment Artifacts

```http
GET /api/v1/servers/{id}/deploy/artifacts
```

Lists available deployment artifacts (build outputs) for a server.

### Path Parameters
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | Yes | Server ID |

### Example Response
```json
{
  "data": [
    {
      "id": "art_abc123",
      "filename": "server-v2.1.0.jar",
      "size_bytes": 52428800,
      "created_at": "2026-05-10T11:50:00Z",
      "build_id": "bld_abc123"
    }
  ]
}
```

### Possible Errors
| HTTP | Code | Description |
|------|------|-------------|
| 404 | `SRV_NOT_FOUND` | Server not found |

---

## Deploy from Modrinth

```http
POST /api/v1/servers/{id}/deploy/modrinth
```

Deploys a server version directly from Modrinth.

### Path Parameters
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | Yes | Server ID |

### Request Body
```json
{
  "project_id": "modrinth-project-id",
  "version_id": "modrinth-version-id"
}
```

### Example Request

::: code-group

```bash [curl]
curl -X POST https://api.esluce.com/api/v1/servers/srv_abc123/deploy/modrinth \
  -H "Authorization: Bearer ${ESCLUSE_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{"project_id": "modrinth-project-id", "version_id": "modrinth-version-id"}'
```

```typescript [Node.js SDK]
await client.servers.deployModrinth('srv_abc123', {
  projectId: 'modrinth-project-id',
  versionId: 'modrinth-version-id'
});
```

```python [Python SDK]
client.servers.deploy_modrinth('srv_abc123', project_id='modrinth-project-id', version_id='modrinth-version-id')
```

:::

### Possible Errors
| HTTP | Code | Description |
|------|------|-------------|
| 404 | `SRV_NOT_FOUND` | Server not found |
| 400 | `MODRINTH_FETCH_FAILED` | Failed to fetch from Modrinth |

---

## Rollback

```http
POST /api/v1/servers/{id}/deploy/rollback
```

Rolls back the server to a previous deployment.

⚠️ **Warning:** The server will restart during rollback. Any changes made since the target deployment will be lost.

### Path Parameters
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | Yes | Server ID |

### Request Body
```json
{
  "deployment_id": "dep_abc123"
}
```

### Example Request

::: code-group

```bash [curl]
curl -X POST https://api.esluce.com/api/v1/servers/srv_abc123/deploy/rollback \
  -H "Authorization: Bearer ${ESCLUSE_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{"deployment_id": "dep_abc123"}'
```

```typescript [Node.js SDK]
await client.servers.rollbackDeployment('srv_abc123', {
  deploymentId: 'dep_abc123'
});
```

```python [Python SDK]
client.servers.rollback_deployment('srv_abc123', deployment_id='dep_abc123')
```

:::

### Example Response
```json
{
  "data": {
    "deployment_id": "dep_xyz789",
    "rollback_to": "dep_abc123",
    "status": "rolling_back"
  }
}
```

### Possible Errors
| HTTP | Code | Description |
|------|------|-------------|
| 404 | `SRV_NOT_FOUND` | Server not found |
| 400 | `DEPLOY_NOT_FOUND` | Deployment to rollback to not found |

---

## Global Deploy Endpoints

### List Deploy Projects

```http
GET /api/v1/deploy/projects
```

Lists all deploy projects across the platform.

### Example Response
```json
{
  "data": [
    {
      "id": "prj_abc123",
      "name": "My Server Plugin",
      "type": "minecraft",
      "last_deployed_at": "2026-05-10T12:00:00Z"
    }
  ]
}
```

---

### List Deploy Servers

```http
GET /api/v1/deploy/servers
```

Lists all available deployment target servers.

### Example Response
```json
{
  "data": [
    {
      "id": "srv_abc123",
      "name": "Minecraft Survival",
      "current_version": "v2.1.0"
    }
  ]
}
```

### Related Pages
- [Servers API](/api/servers) — Server CRUD operations
- [Build System](/api/servers/build) — Build and compile server code
- [Error Codes](/api/errors) — Complete error code reference

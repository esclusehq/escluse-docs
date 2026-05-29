# Deploy API

Manage Modrinth deployments and deployment projects. For per-server deployment, see [Server Deployment](/api/servers/deploy).

## List Deploy Projects

```http
GET /api/v1/deploy/projects
```

Retrieves all deployment projects.

## List Deploy Servers

```http
GET /api/v1/deploy/servers
```

Retrieves all servers configured as deployment targets.

### Possible Errors
| HTTP | Code | Description |
|------|------|-------------|
| 401 | `AUTH_TOKEN_INVALID` | Authentication required |

### Related Pages
- [Server Deployment](/api/servers/deploy) — Per-server deployment operations
- [Error Codes](/api/errors) — Complete error code reference

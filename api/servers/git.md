# Git Operations

Manage server source code via Git integration. Enables development workflows with version control directly on your server.

All endpoints are prefixed with `/api/v1/servers/{id}/git`.

## Repository Status

```http
GET /api/v1/servers/{id}/git/status
```

Returns the current Git repository status including branch, uncommitted changes, and ahead/behind counts.

### Path Parameters
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | Yes | Server ID |

### Example Request

::: code-group

```bash [curl]
curl -X GET https://api.esluce.com/api/v1/servers/srv_abc123/git/status \
  -H "Authorization: Bearer ${ESCLUSE_API_KEY}"
```

```typescript [Node.js SDK]
const status = await client.servers.gitStatus('srv_abc123');
```

```python [Python SDK]
status = client.servers.git_status('srv_abc123')
```

:::

### Example Response
```json
{
  "data": {
    "branch": "main",
    "ahead": 2,
    "behind": 0,
    "uncommitted_changes": 3,
    "last_commit": "abc1234",
    "last_commit_message": "Update server configuration"
  }
}
```

### Possible Errors
| HTTP | Code | Description |
|------|------|-------------|
| 404 | `SRV_NOT_FOUND` | Server not found |
| 400 | `GIT_NOT_INITIALIZED` | Repository not initialized |

---

## Clone Repository

```http
POST /api/v1/servers/{id}/git/clone
```

Clones a remote Git repository into the server's working directory.

### Path Parameters
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | Yes | Server ID |

### Request Body
```json
{
  "url": "https://github.com/user/my-server-plugin.git",
  "branch": "main"
}
```

### Example Request

::: code-group

```bash [curl]
curl -X POST https://api.esluce.com/api/v1/servers/srv_abc123/git/clone \
  -H "Authorization: Bearer ${ESCLUSE_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://github.com/user/my-server-plugin.git", "branch": "main"}'
```

```typescript [Node.js SDK]
await client.servers.gitClone('srv_abc123', {
  url: 'https://github.com/user/my-server-plugin.git',
  branch: 'main'
});
```

```python [Python SDK]
client.servers.git_clone('srv_abc123', url='https://github.com/user/my-server-plugin.git', branch='main')
```

:::

### Example Response
```json
{
  "data": {
    "branch": "main",
    "commit": "def5678",
    "message": "Cloned 15 commits from remote"
  }
}
```

### Possible Errors
| HTTP | Code | Description |
|------|------|-------------|
| 404 | `SRV_NOT_FOUND` | Server not found |
| 400 | `GIT_CLONE_FAILED` | Failed to clone repository (invalid URL or authentication) |

---

## Create Commit

```http
POST /api/v1/servers/{id}/git/commit
```

Stages all changes and creates a new commit.

### Path Parameters
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | Yes | Server ID |

### Request Body
```json
{
  "message": "Update configuration files"
}
```

### Example Request

::: code-group

```bash [curl]
curl -X POST https://api.esluce.com/api/v1/servers/srv_abc123/git/commit \
  -H "Authorization: Bearer ${ESCLUSE_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{"message": "Update configuration files"}'
```

```typescript [Node.js SDK]
await client.servers.gitCommit('srv_abc123', {
  message: 'Update configuration files'
});
```

```python [Python SDK]
client.servers.git_commit('srv_abc123', message='Update configuration files')
```

:::

### Example Response
```json
{
  "data": {
    "commit": "ghi9012",
    "files_changed": 3,
    "insertions": 15,
    "deletions": 2
  }
}
```

### Possible Errors
| HTTP | Code | Description |
|------|------|-------------|
| 404 | `SRV_NOT_FOUND` | Server not found |
| 400 | `VAL_REQUIRED_FIELD` | Missing commit message |
| 400 | `GIT_NOTHING_TO_COMMIT` | No changes to commit |

---

## Pull Changes

```http
POST /api/v1/servers/{id}/git/pull
```

Pulls the latest changes from the remote repository.

### Path Parameters
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | Yes | Server ID |

### Possible Errors
| HTTP | Code | Description |
|------|------|-------------|
| 404 | `SRV_NOT_FOUND` | Server not found |
| 409 | `GIT_MERGE_CONFLICT` | Merge conflicts detected; resolve manually |

---

## Push Changes

```http
POST /api/v1/servers/{id}/git/push
```

Pushes committed changes to the remote repository.

### Path Parameters
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | Yes | Server ID |

### Example Request

::: code-group

```bash [curl]
curl -X POST https://api.esluce.com/api/v1/servers/srv_abc123/git/push \
  -H "Authorization: Bearer ${ESCLUSE_API_KEY}"
```

```typescript [Node.js SDK]
await client.servers.gitPush('srv_abc123');
```

```python [Python SDK]
client.servers.git_push('srv_abc123')
```

:::

### Possible Errors
| HTTP | Code | Description |
|------|------|-------------|
| 404 | `SRV_NOT_FOUND` | Server not found |
| 400 | `GIT_PUSH_FAILED` | Push rejected (remote has diverged) |

---

## Configure Remote

```http
GET /api/v1/servers/{id}/git/remote
```

Retrieves the current remote repository URL.

```http
POST /api/v1/servers/{id}/git/remote
```

Sets or updates the remote repository URL.

### Path Parameters
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | Yes | Server ID |

### Request Body (POST)
```json
{
  "url": "https://github.com/user/my-server-plugin.git"
}
```

### Example Response (GET)
```json
{
  "data": {
    "remote": "origin",
    "url": "https://github.com/user/my-server-plugin.git"
  }
}
```

---

## Configure Git

```http
POST /api/v1/servers/{id}/git/config
```

Sets Git user configuration for commits.

### Path Parameters
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | Yes | Server ID |

### Request Body
```json
{
  "name": "Developer",
  "email": "dev@example.com"
}
```

### Possible Errors
| HTTP | Code | Description |
|------|------|-------------|
| 400 | `VAL_REQUIRED_FIELD` | Missing name or email |

---

## Initialize Repository

```http
POST /api/v1/servers/{id}/git/init
```

Initializes a new Git repository in the server's working directory.

### Path Parameters
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | Yes | Server ID |

### Possible Errors
| HTTP | Code | Description |
|------|------|-------------|
| 404 | `SRV_NOT_FOUND` | Server not found |
| 409 | `GIT_ALREADY_INITIALIZED` | Repository already initialized |

### Related Pages
- [Servers API](/api/servers) — Server CRUD operations
- [Build System](/api/servers/build) — Build and compile server code
- [Error Codes](/api/errors) — Complete error code reference

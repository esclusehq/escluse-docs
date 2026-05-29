# File Management

Manage server files via the REST API. Supports reading, writing, uploading, downloading, and organizing files in the server's working directory.

All endpoints are prefixed with `/api/v1/servers/{id}/files`.

## File Operations

### List Files

```http
POST /api/v1/servers/{id}/files/list
```

Lists files and directories in a specified path. Returns file metadata including name, size, type, and modification date.

### Path Parameters
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | Yes | Server ID |

### Request Body
```json
{
  "path": "/",
  "show_hidden": false,
  "recursive": false
}
```

### Example Request

::: code-group

```bash [curl]
curl -X POST https://api.esluce.com/api/v1/servers/srv_abc123/files/list \
  -H "Authorization: Bearer ${ESCLUSE_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{"path": "/", "show_hidden": false}'
```

```typescript [Node.js SDK]
const files = await client.servers.listFiles('srv_abc123', {
  path: '/',
  showHidden: false
});
```

```python [Python SDK]
files = client.servers.list_files('srv_abc123', path='/', show_hidden=False)
```

:::

### Example Response
```json
{
  "data": [
    {
      "name": "server.properties",
      "path": "/server.properties",
      "type": "file",
      "size_bytes": 4096,
      "modified_at": "2026-05-10T12:00:00Z",
      "permissions": "644"
    },
    {
      "name": "plugins",
      "path": "/plugins",
      "type": "directory",
      "size_bytes": 0,
      "modified_at": "2026-05-10T11:55:00Z",
      "permissions": "755"
    }
  ]
}
```

### Possible Errors
| HTTP | Code | Description |
|------|------|-------------|
| 404 | `SRV_NOT_FOUND` | Server not found |
| 400 | `VAL_REQUIRED_FIELD` | Missing required path field |

---

### Read File

```http
POST /api/v1/servers/{id}/files/read
```

Reads the contents of a file. Returns the file content as a string.

### Path Parameters
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | Yes | Server ID |

### Request Body
```json
{
  "path": "/server.properties"
}
```

### Example Request

::: code-group

```bash [curl]
curl -X POST https://api.esluce.com/api/v1/servers/srv_abc123/files/read \
  -H "Authorization: Bearer ${ESCLUSE_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{"path": "/server.properties"}'
```

```typescript [Node.js SDK]
const content = await client.servers.readFile('srv_abc123', {
  path: '/server.properties'
});
```

```python [Python SDK]
content = client.servers.read_file('srv_abc123', path='/server.properties')
```

:::

### Example Response
```json
{
  "data": {
    "path": "/server.properties",
    "content": "# Minecraft server properties\nserver-port=25565\nmax-players=20\nview-distance=10\n"
  }
}
```

### Possible Errors
| HTTP | Code | Description |
|------|------|-------------|
| 404 | `SRV_NOT_FOUND` | Server not found |
| 404 | `FILE_NOT_FOUND` | File does not exist |

---

### Write File

```http
PUT /api/v1/servers/{id}/files/write
```

Writes content to a file. Creates the file if it does not exist, overwrites if it does.

### Path Parameters
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | Yes | Server ID |

### Request Body
```json
{
  "path": "/server.properties",
  "content": "# Updated config\nserver-port=25566\n"
}
```

### Example Request

::: code-group

```bash [curl]
curl -X PUT https://api.esluce.com/api/v1/servers/srv_abc123/files/write \
  -H "Authorization: Bearer ${ESCLUSE_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{"path": "/server.properties", "content": "server-port=25566"}'
```

```typescript [Node.js SDK]
await client.servers.writeFile('srv_abc123', {
  path: '/server.properties',
  content: 'server-port=25566'
});
```

```python [Python SDK]
client.servers.write_file('srv_abc123', path='/server.properties', content='server-port=25566')
```

:::

### Possible Errors
| HTTP | Code | Description |
|------|------|-------------|
| 404 | `SRV_NOT_FOUND` | Server not found |
| 413 | `FILE_TOO_LARGE` | File exceeds maximum size limit |

---

### Delete File

```http
DELETE /api/v1/servers/{id}/files
```

Deletes a file or directory from the server.

⚠️ **Warning:** This action is irreversible. Deleted files cannot be recovered.

### Path Parameters
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | Yes | Server ID |

### Query Parameters
| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `path` | string | Yes | — | Path to the file or directory to delete |
| `recursive` | boolean | No | `false` | Recursively delete directory contents |

### Possible Errors
| HTTP | Code | Description |
|------|------|-------------|
| 404 | `SRV_NOT_FOUND` | Server not found |
| 404 | `FILE_NOT_FOUND` | File does not exist |

---

### Get File Metadata

```http
GET /api/v1/servers/{id}/files
```

Returns metadata for a specific file.

### Query Parameters
| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `path` | string | Yes | — | Path to the file |

### Example Response
```json
{
  "data": {
    "name": "server.properties",
    "path": "/server.properties",
    "type": "file",
    "size_bytes": 4096,
    "modified_at": "2026-05-10T12:00:00Z",
    "permissions": "644"
  }
}
```

---

### Search Files

```http
GET /api/v1/servers/{id}/files/search
```

Searches for files by name or pattern within the server's filesystem.

### Query Parameters
| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `pattern` | string | Yes | — | Search pattern (glob or substring) |
| `path` | string | No | `/` | Directory to search within |

### Example Request

::: code-group

```bash [curl]
curl -X GET "https://api.esluce.com/api/v1/servers/srv_abc123/files/search?pattern=*.yml&path=/plugins" \
  -H "Authorization: Bearer ${ESCLUSE_API_KEY}"
```

```typescript [Node.js SDK]
const matches = await client.servers.searchFiles('srv_abc123', {
  pattern: '*.yml',
  path: '/plugins'
});
```

```python [Python SDK]
matches = client.servers.search_files('srv_abc123', pattern='*.yml', path='/plugins')
```

:::

### Example Response
```json
{
  "data": [
    { "name": "config.yml", "path": "/plugins/config.yml", "size_bytes": 128 }
  ]
}
```

### Possible Errors
| HTTP | Code | Description |
|------|------|-------------|
| 404 | `SRV_NOT_FOUND` | Server not found |

---

## File Transfer

### Download File

```http
GET /api/v1/servers/{id}/files/download
```

Downloads a file from the server. Returns the file content as a binary stream with appropriate `Content-Type` and `Content-Disposition` headers.

### Query Parameters
| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `path` | string | Yes | — | Path to the file to download |

### Example Request

::: code-group

```bash [curl]
curl -X GET "https://api.esluce.com/api/v1/servers/srv_abc123/files/download?path=/world/region/r.0.0.mca" \
  -H "Authorization: Bearer ${ESCLUSE_API_KEY}" \
  --output r.0.0.mca
```

```typescript [Node.js SDK]
const stream = await client.servers.downloadFile('srv_abc123', {
  path: '/world/region/r.0.0.mca'
});
// stream is a ReadableStream — pipe to file or process
```

```python [Python SDK]
with open('r.0.0.mca', 'wb') as f:
    client.servers.download_file('srv_abc123', path='/world/region/r.0.0.mca', fileobj=f)
```

:::

### Possible Errors
| HTTP | Code | Description |
|------|------|-------------|
| 404 | `SRV_NOT_FOUND` | Server not found |
| 404 | `FILE_NOT_FOUND` | File does not exist |

---

### Upload File

```http
POST /api/v1/servers/{id}/files/upload
```

Uploads a file to the server. Supports multipart form data for file content.

### Request Body
```
multipart/form-data
- file: (binary)
- path: "/plugins/MyPlugin.jar"
```

### Example Request

::: code-group

```bash [curl]
curl -X POST https://api.esluce.com/api/v1/servers/srv_abc123/files/upload \
  -H "Authorization: Bearer ${ESCLUSE_API_KEY}" \
  -F "file=@MyPlugin.jar" \
  -F "path=/plugins/MyPlugin.jar"
```

```typescript [Node.js SDK]
import { readFileSync } from 'fs';

await client.servers.uploadFile('srv_abc123', {
  path: '/plugins/MyPlugin.jar',
  file: readFileSync('MyPlugin.jar')
});
```

```python [Python SDK]
with open('MyPlugin.jar', 'rb') as f:
    client.servers.upload_file('srv_abc123', path='/plugins/MyPlugin.jar', file=f)
```

:::

### Possible Errors
| HTTP | Code | Description |
|------|------|-------------|
| 404 | `SRV_NOT_FOUND` | Server not found |
| 413 | `FILE_TOO_LARGE` | File exceeds maximum upload size |

---

### Chunked Upload

```http
POST /api/v1/servers/{id}/files/upload/chunked
```

Starts a chunked file upload session. Use for large files that exceed the single upload size limit. After initiating, upload chunks sequentially using the session ID.

### Request Body
```json
{
  "filename": "large-world-backup.tar.gz",
  "total_size_bytes": 524288000,
  "total_chunks": 5
}
```

### Example Response
```json
{
  "data": {
    "session_id": "chs_abc123",
    "chunk_size": 104857600,
    "chunks_received": 0,
    "total_chunks": 5
  }
}
```

### Possible Errors
| HTTP | Code | Description |
|------|------|-------------|
| 404 | `SRV_NOT_FOUND` | Server not found |
| 409 | `UPLOAD_IN_PROGRESS` | An upload session is already in progress for this filename |

---

### Upload Status

```http
GET /api/v1/servers/{id}/files/upload/status/{filename}
```

Checks the status of an ongoing or completed chunked upload.

### Path Parameters
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | Yes | Server ID |
| `filename` | string | Yes | Name of the file being uploaded |

### Example Response
```json
{
  "data": {
    "filename": "large-world-backup.tar.gz",
    "session_id": "chs_abc123",
    "status": "in_progress",
    "chunks_received": 3,
    "total_chunks": 5,
    "progress_percent": 60
  }
}
```

### Possible Errors
| HTTP | Code | Description |
|------|------|-------------|
| 404 | `SRV_NOT_FOUND` | Server not found |
| 404 | `UPLOAD_NOT_FOUND` | No upload session for this filename |

---

## Directory Operations

### Create Directory

```http
POST /api/v1/servers/{id}/files/mkdir
```

Creates a new directory at the specified path.

### Path Parameters
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | Yes | Server ID |

### Request Body
```json
{
  "path": "/plugins/MyPlugin",
  "parents": true
}
```

### Possible Errors
| HTTP | Code | Description |
|------|------|-------------|
| 404 | `SRV_NOT_FOUND` | Server not found |
| 409 | `DIR_ALREADY_EXISTS` | Directory already exists |

---

### Rename

```http
POST /api/v1/servers/{id}/files/rename
```

Renames or moves a file or directory.

### Path Parameters
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | Yes | Server ID |

### Request Body
```json
{
  "from": "/plugins/old-name.jar",
  "to": "/plugins/new-name.jar"
}
```

### Possible Errors
| HTTP | Code | Description |
|------|------|-------------|
| 404 | `SRV_NOT_FOUND` | Server not found |
| 404 | `FILE_NOT_FOUND` | Source file does not exist |
| 409 | `FILE_ALREADY_EXISTS` | Destination already exists |

---

### Copy

```http
POST /api/v1/servers/{id}/files/copy
```

Copies a file or directory to a new location.

### Path Parameters
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | Yes | Server ID |

### Request Body
```json
{
  "from": "/world/region/r.0.0.mca",
  "to": "/backups/world/region/r.0.0.mca"
}
```

### Possible Errors
| HTTP | Code | Description |
|------|------|-------------|
| 404 | `SRV_NOT_FOUND` | Server not found |
| 404 | `FILE_NOT_FOUND` | Source file does not exist |

---

### Compress

```http
POST /api/v1/servers/{id}/files/compress
```

Compresses one or more files into a ZIP archive.

### Path Parameters
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | Yes | Server ID |

### Request Body
```json
{
  "paths": ["/world", "/server.properties"],
  "destination": "/backups/world-backup.zip"
}
```

### Possible Errors
| HTTP | Code | Description |
|------|------|-------------|
| 404 | `SRV_NOT_FOUND` | Server not found |
| 507 | `DISK_FULL` | Insufficient disk space for compression |

---

### Extract

```http
POST /api/v1/servers/{id}/files/extract
```

Extracts a ZIP archive into the server's filesystem.

### Path Parameters
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | Yes | Server ID |

### Request Body
```json
{
  "archive_path": "/backups/world-backup.zip",
  "destination": "/",
  "overwrite": true
}
```

### Possible Errors
| HTTP | Code | Description |
|------|------|-------------|
| 404 | `SRV_NOT_FOUND` | Server not found |
| 400 | `INVALID_ARCHIVE` | Archive is corrupted or invalid format |

### Related Pages
- [Servers API](/api/servers) — Server CRUD operations
- [Console & Logs](/api/servers/console) — Server logs and console commands
- [Error Codes](/api/errors) — Complete error code reference

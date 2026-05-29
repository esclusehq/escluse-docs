# Jobs API

Track asynchronous background jobs such as server deployment, backup restoration, and plugin installation.

## List Jobs

```http
GET /api/v1/jobs
```

Retrieves a list of all jobs, sorted by creation date.

### Query Parameters
| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `status` | string | No | — | Filter by status (pending, running, completed, failed) |
| `page` | integer | No | 1 | Page number |
| `limit` | integer | No | 20 | Items per page |

## Get Job

```http
GET /api/v1/jobs/{id}
```

Retrieves details and current status of a specific job.

### Example Response
```json
{
  "data": {
    "id": "job_abc123",
    "type": "server_deploy",
    "status": "running",
    "progress": 65,
    "created_at": "2026-05-10T12:00:00Z",
    "completed_at": null,
    "error": null
  }
}
```

### Possible Errors
| HTTP | Code | Description |
|------|------|-------------|
| 404 | `GEN_NOT_FOUND` | Job not found |

### Related Pages
- [Servers API](/api/servers) — Server operations generate jobs
- [Error Codes](/api/errors) — Complete error code reference

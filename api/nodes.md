# Nodes API

Manage game server nodes via the REST API.

## List Nodes

```http
GET /api/v1/nodes
```

**Response:**
```json
{
  "data": [
    {
      "id": "node_xyz",
      "name": "Production Node 1",
      "ip": "192.168.1.100",
      "status": "online",
      "server_count": 5,
      "uptime_hours": 720,
      "resources": {
        "total_cpu": 8,
        "total_memory": "32GB",
        "total_disk": "500GB"
      },
      "last_heartbeat": "2026-05-10T12:00:00Z"
    }
  ]
}
```

## Get Node

```http
GET /api/v1/nodes/{id}
```

**Response:**
```json
{
  "data": {
    "id": "node_xyz",
    "name": "Production Node 1",
    "ip": "192.168.1.100",
    "status": "online",
    "version": "1.2.3",
    "server_count": 5,
    "uptime_hours": 720,
    "resources": {
      "available_cpu": 4,
      "available_memory": "16GB",
      "available_disk": "200GB"
    },
    "created_at": "2026-04-01T00:00:00Z",
    "last_heartbeat": "2026-05-10T12:00:00Z"
  }
}
```

## Register Node

```http
POST /api/v1/nodes
```

**Request Body:**
```json
{
  "name": "New Node",
  "api_key": "esk_xxx"
}
```

**Response:**
```json
{
  "data": {
    "id": "node_new123",
    "name": "New Node",
    "status": "pending"
  }
}
```

## Update Node

```http
PATCH /api/v1/nodes/{id}
```

**Request Body:**
```json
{
  "name": "Updated Node Name"
}
```

## Delete Node

```http
DELETE /api/v1/nodes/{id}
```

⚠️ **Warning:** Deleting a node will stop all servers running on it.

## Node Status Values

| Status | Description |
|--------|-------------|
| `online` | Node connected and healthy |
| `offline` | Node disconnected |
| `degraded` | Node experiencing issues |
| `pending` | Node awaiting registration |

## Node Resources

The node agent reports real-time resource usage:

```json
{
  "resources": {
    "cpu": {
      "used": 3.2,
      "total": 8,
      "usage_percent": 40
    },
    "memory": {
      "used": "12GB",
      "total": "32GB",
      "usage_percent": 37.5
    },
    "disk": {
      "used": "250GB",
      "total": "500GB",
      "usage_percent": 50
    }
  }
}
```

## Node Heartbeat

Nodes send heartbeat signals every 30 seconds:

```json
{
  "type": "heartbeat",
  "node_id": "node_xyz",
  "timestamp": "2026-05-10T12:00:00Z",
  "resources": {...},
  "servers": [
    { "id": "srv_abc", "status": "running", "cpu": 12.5, "memory": "2GB" }
  ]
}
```

## Quotas

Node creation is limited by subscription plan:

| Plan | Max Nodes |
|------|-----------|
| Starter | 1 |
| Pro | 3 |
| Enterprise | Unlimited |
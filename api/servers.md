# Servers API

Manage game servers via the REST API.

## List Servers

```http
GET /api/v1/servers
```

**Response:**
```json
{
  "data": [
    {
      "id": "srv_abc123",
      "name": "Minecraft Server",
      "game_type": "minecraft",
      "status": "running",
      "node_id": "node_xyz",
      "resources": {
        "cpu": 2,
        "memory": "4GB"
      },
      "created_at": "2026-05-10T12:00:00Z"
    }
  ],
  "pagination": { "page": 1, "limit": 20, "total": 5, "pages": 1 }
}
```

## Get Server

```http
GET /api/v1/servers/{id}
```

**Response:**
```json
{
  "data": {
    "id": "srv_abc123",
    "name": "Minecraft Server",
    "game_type": "minecraft",
    "status": "running",
    "ip": "192.168.1.100",
    "port": 25565,
    "resources": {
      "cpu": 2,
      "memory": "4GB",
      "disk": "50GB"
    },
    "metrics": {
      "cpu_usage": 45.2,
      "memory_usage": 62.1,
      "disk_usage": 23.5
    }
  }
}
```

## Create Server

```http
POST /api/v1/servers
```

**Request Body:**
```json
{
  "name": "Minecraft Server",
  "game_type": "minecraft",
  "node_id": "node_xyz",
  "resources": {
    "cpu": 2,
    "memory": "4GB"
  },
  "options": {
    "version": "1.20.4",
    "mc_loader": "paper",
    "eula_accepted": true
  }
}
```

**Response:**
```json
{
  "data": {
    "id": "srv_new123",
    "status": "creating",
    "estimated_time": 120
  }
}
```

## Start Server

```http
POST /api/v1/servers/{id}/start
```

**Response:**
```json
{
  "data": {
    "id": "srv_abc123",
    "status": "starting"
  }
}
```

## Stop Server

```http
POST /api/v1/servers/{id}/stop
```

## Restart Server

```http
POST /api/v1/servers/{id}/restart
```

## Delete Server

```http
DELETE /api/v1/servers/{id}
```

⚠️ **Warning:** This action is irreversible.

**Query Parameters:**
- `confirm`: Must be `true` to confirm deletion

## Server Logs

```http
GET /api/v1/servers/{id}/logs?tail=100
```

**Response:**
```json
{
  "data": [
    {
      "timestamp": "2026-05-10T12:00:00Z",
      "level": "INFO",
      "message": "Done (22.123s)! For help, type \"help\""
    }
  ]
}
```

## Send Console Command

```http
POST /api/v1/servers/{id}/console
```

**Request Body:**
```json
{
  "command": "say Hello from Escluse!"
}
```

## Server Status Values

| Status | Description |
|--------|-------------|
| `creating` | Server being provisioned |
| `starting` | Server starting up |
| `running` | Server is online |
| `stopping` | Server shutting down |
| `stopped` | Server is offline |
| `error` | Server encountered an error |
| `deleting` | Server being removed |
# Agents API

Manage Escluse agents deployed on compute nodes.

## List Agents

```http
GET /api/v1/agents
```

Retrieves all registered agents.

## Create Agent

```http
POST /api/v1/agents
```

Registers a new agent on a node.

### Request Body
```json
{
  "node_id": "node_abc123",
  "version": "1.2.3"
}
```

## Get Agent

```http
GET /api/v1/agents/{id}
```

## Delete Agent

```http
DELETE /api/v1/agents/{id}
```

## Available Agents

```http
GET /api/v1/agents/available
```

Lists available agent versions and download links for supported platforms.

### Example Response
```json
{
  "data": {
    "versions": [
      {
        "version": "1.2.3",
        "platforms": {
"linux/amd64": "https://get.esluce.com/agent/v1.2.3/escluse-agent-linux-amd64",
"linux/arm64": "https://get.esluce.com/agent/v1.2.3/escluse-agent-linux-arm64",
"windows/amd64": "https://get.esluce.com/agent/v1.2.3/escluse-agent-windows-amd64.exe"
        }
      }
    ]
  }
}
```

### Possible Errors
| HTTP | Code | Description |
|------|------|-------------|
| 404 | `NODE_NOT_FOUND` | Node does not exist |
| 404 | `GEN_NOT_FOUND` | Agent not found |

### Related Pages
- [Nodes API](/api/nodes) — Node management
- [Node API Keys](/api/nodes/api-keys) — Agent authentication

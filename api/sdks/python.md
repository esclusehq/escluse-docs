# Python SDK

Official Python SDK for the Escluse API. Source code and full API reference available on [GitHub](https://github.com/escluse/sdk-python).

## Installation

```bash
pip install escluse
```

Requires Python 3.9 or later. We recommend using a virtual environment.

## Initialization

Create a client instance with your API key:

```python
from escluse import Escluse

client = Escluse(api_key="your-api-key")
```

We recommend storing your API key in an environment variable rather than hardcoding it:

```python
import os
from escluse import Escluse

client = Escluse(api_key=os.environ["ESCLUSE_API_KEY"])
```

## Authentication

The SDK handles authentication automatically using the API key provided during initialization. All requests include the required `Authorization: Bearer` header.

### User Authentication

For user-facing applications, use the `auth` module:

```python
# Login with email/password
session = client.auth.login(
    email="user@example.com",
    password="your-password"
)

# The SDK stores the session and automatically refreshes tokens
```

## Basic Usage

### List Servers

```python
servers = client.servers.list()
for server in servers["data"]:
    print(f"{server['name']} — {server['status']}")
```

### Create a Server

```python
server = client.servers.create(
    name="My Minecraft Server",
    game_type="minecraft",
    node_id="node_xyz",
    resources={"cpu": 2, "memory": "4GB"},
    options={
        "version": "1.20.4",
        "mc_loader": "paper",
        "eula_accepted": True
    }
)

print(f"Server {server['id']} created with status: {server['status']}")
```

### Get Node Status

```python
node = client.nodes.get("node_xyz")
print(f"Node status: {node['status']}")
```

## Error Handling

The SDK raises typed exceptions for API failures:

```python
from escluse import Escluse, EscluseError

client = Escluse(api_key="your-api-key")

try:
    servers = client.servers.list()
except EscluseError as e:
    print(f"API Error [{e.code}]: {e.message}")
    # e.code: 'SRV_NOT_FOUND', 'AUTH_TOKEN_EXPIRED', etc.
    # e.status_code: HTTP status code
except ConnectionError as e:
    print(f"Network error: {e}")
```

Common error codes:

| Code | Description |
|------|-------------|
| `AUTH_TOKEN_EXPIRED` | Access token expired — SDK should auto-refresh |
| `SRV_NOT_FOUND` | Server ID does not exist |
| `RATE_LIMITED` | Too many requests — implement retry with backoff |

See the full [Error Code Catalog](/api/errors) for the complete list.

## Pagination

List endpoints return paginated responses with pagination metadata:

```python
response = client.servers.list(page=1, limit=20)
servers = response["data"]
pagination = response["pagination"]

print(f"Page {pagination['page']} of {pagination['pages']}")
```

## Next Steps

- Full API reference: [github.com/escluse/sdk-python](https://github.com/escluse/sdk-python)
- [Node.js SDK](/api/sdks/node) — Node.js SDK quickstart
- [API Overview](/api/overview) — Base URL, rate limits, response format
- [Error Codes](/api/errors) — Complete error code reference

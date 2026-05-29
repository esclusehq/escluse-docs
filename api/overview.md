# API Overview

The Escluse REST API provides programmatic access to all platform features, including server management, node administration, billing, and more. Base URL for all API v1 endpoints:

```
https://api.esluce.com/api/v1
```

## Authentication

All API requests require authentication via Bearer token in the `Authorization` header. Two authentication methods are supported:

- **User Authentication** — Supabase JWT tokens for user-facing API calls
- **Node API Key Authentication** — `esk_` prefixed API keys for agent/node registration

See the [Authentication Guide](/api/auth) for complete flow documentation, token acquisition, and usage examples.

## Response Format

All API responses follow a consistent JSON structure:

### Success Response

```json
{
  "data": { ... },
  "status": "success",
  "message": "Optional success message"
}
```

### Error Response

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request parameters",
    "details": [...]
  },
  "status": "error"
}
```

List endpoints return paginated responses (see Pagination section). The HTTP status code indicates the result: `2xx` for success, `4xx` for client errors, `5xx` for server errors.

## API Versioning

The current API version is **v1**, accessible via the `/api/v1/` prefix. Legacy routes under `/api/` (without version prefix) continue to work but are deprecated. New integrations should use the `/api/v1/` prefix exclusively.

Versioning strategy:
- Breaking changes are released as a new API version (e.g., `/api/v2/`)
- Backward-compatible additions (new endpoints, optional fields) are added to v1 without a version bump
- Deprecated endpoints are announced in the [Changelog](/api/changelog) with a minimum 90-day sunset period

## Content Type

All requests must include the `Content-Type: application/json` header. Request and response bodies are JSON-encoded.

## Pagination

List endpoints support cursor-based pagination:

```
GET /api/v1/servers?page=1&limit=20
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | integer | 1 | Page number to retrieve |
| `limit` | integer | 20 | Items per page (max: 100) |

Response includes pagination metadata:

```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "pages": 5
  }
}
```

## Rate Limiting

API requests are rate-limited based on your subscription plan. Rate limit information is returned in response headers:

| Header | Description |
|--------|-------------|
| `X-RateLimit-Limit` | Maximum requests per minute |
| `X-RateLimit-Remaining` | Requests remaining in current window |
| `X-RateLimit-Reset` | Unix timestamp when the limit resets |

Per-plan rate limits:

| Plan | Requests/Minute | Burst Limit |
|------|-----------------|-------------|
| Starter | 60 | 10 |
| Pro | 300 | 50 |
| Enterprise | Custom (contact sales) | Custom |

When a rate limit is exceeded, the API returns a `429 Too Many Requests` response with a `Retry-After` header indicating seconds until the limit resets.

### Best Practices

- Implement exponential backoff when receiving `429` responses
- Cache responses where appropriate to reduce API calls
- Use the `X-RateLimit-Remaining` header to preemptively throttle requests
- For high-throughput use cases, consider upgrading your plan or contacting support

## Cross-Origin Resource Sharing (CORS)

The API supports CORS for browser-based applications. Preflight `OPTIONS` requests are handled automatically. All origins are allowed for development; production applications should specify allowed origins.

## WebSocket

Real-time updates are available via WebSocket connections. Currently supported WebSocket endpoints:

| Endpoint | Description |
|----------|-------------|
| `wss://api.esluce.com/ws` | General event stream (server status changes, node events) |
| `wss://api.esluce.com/ws/docker-logs` | Live container log streaming |
| `wss://api.esluce.com/ws/terminal/:server_id` | Interactive server terminal |

**Example: General event stream**

```javascript
const ws = new WebSocket('wss://api.esluce.com/ws', {
  headers: { 'Authorization': 'Bearer ' + token }
});

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  // { type: 'server_status', data: { id: '...', status: 'running' } }
};
```

## SDKs

Official SDKs for common programming languages:

- [Node.js SDK](/api/sdks/node) — Quickstart guide and basic usage
- [Python SDK](/api/sdks/python) — Quickstart guide and basic usage

Full API reference for each SDK is maintained in the respective GitHub repositories:
- [github.com/escluse/sdk-node](https://github.com/escluse/sdk-node)
- [github.com/escluse/sdk-python](https://github.com/escluse/sdk-python)

## Health Check

```http
GET /api/v1/health
```

Returns the API's operational status. Use this endpoint for monitoring and uptime checks.

**Response:**

```json
{
  "status": "ok",
  "version": "1.0.0",
  "uptime_seconds": 123456
}
```

## Next Steps

- [Authentication Guide](/api/auth) — Learn how to authenticate API requests
- [Servers API](/api/servers) — Deploy and manage game servers
- [Nodes API](/api/nodes) — Manage compute nodes
- [Error Codes](/api/errors) — Complete error code reference

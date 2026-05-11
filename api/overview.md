# API Overview

The Esluce REST API allows programmatic access to all platform features.

## Base URL

```
https://api.esluce.com/api/v1
```

## Authentication

All API requests require a Bearer token in the Authorization header:

```bash
curl -H "Authorization: Bearer {token}" \
     https://api.esluce.com/api/v1/servers
```

Tokens are obtained via Supabase authentication:

```bash
# Sign in
curl -X POST https://{project}.supabase.co/auth/v1/token?grant_type=password \
  -H "apikey: {supabase_anon_key}" \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password"}'
```

## Response Format

All responses follow a standard format:

```json
{
  "data": { ... },
  "status": "success",
  "message": "Optional message"
}
```

### Error Responses

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

## Pagination

List endpoints support pagination:

```
GET /api/v1/servers?page=1&limit=20
```

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

API requests are rate-limited based on your subscription plan.

Response headers:
- `X-RateLimit-Limit`: Maximum requests per minute
- `X-RateLimit-Remaining`: Requests remaining in window
- `X-RateLimit-Reset`: Unix timestamp when limit resets

## WebSocket

Real-time updates via WebSocket:

```javascript
const ws = new WebSocket('wss://api.esluce.com/ws', {
  headers: { 'Authorization': 'Bearer ' + token }
});

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  // Handle: { type: 'server_status', data: {...} }
};
```

## SDK

Official SDKs available:
- [Node.js SDK](https://github.com/escluse/sdk-node)
- [Python SDK](https://github.com/escluse/sdk-python)

## Next Steps

- [Servers API](/api/servers) - Server CRUD operations
- [Nodes API](/api/nodes) - Node management
- [Billing API](/api/billing) - Subscription and payments
# Webhooks API

Manage outgoing webhooks for receiving real-time notifications about server and billing events.

## List Webhooks

```http
GET /api/v1/webhooks
```

Retrieves all configured webhooks.

## Create Webhook

```http
POST /api/v1/webhooks
```

Creates a new webhook endpoint.

### Request Body
```json
{
  "name": "Discord Notifications",
  "url": "https://discord.com/api/webhooks/...",
  "events": ["server.started", "server.stopped", "server.crashed"],
  "secret": "whsec_..."
}
```

### Example Request

::: code-group

```bash [curl]
curl -X POST https://api.esluce.com/api/v1/webhooks \
  -H "Authorization: Bearer ${ESCLUSE_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{"name": "Discord Notifications", "url": "https://discord.com/api/webhooks/...", "events": ["server.started", "server.stopped"]}'
```

```typescript [Node.js SDK]
const webhook = await client.webhooks.create({
  name: 'Discord Notifications',
  url: 'https://discord.com/api/webhooks/...',
  events: ['server.started', 'server.stopped']
});
```

```python [Python SDK]
webhook = client.webhooks.create(
  name='Discord Notifications',
  url='https://discord.com/api/webhooks/...',
  events=['server.started', 'server.stopped']
)
```

:::

## Get Webhook

```http
GET /api/v1/webhooks/{id}
```

## Update Webhook

```http
PUT /api/v1/webhooks/{id}
```

## Delete Webhook

```http
DELETE /api/v1/webhooks/{id}
```

### Possible Errors
| HTTP | Code | Description |
|------|------|-------------|
| 400 | `VAL_INVALID_FORMAT` | Invalid webhook URL or event type |
| 404 | `GEN_NOT_FOUND` | Webhook not found |

### Related Pages
- [Billing Webhooks](/api/billing/webhooks) — Billing-specific webhook events
- [Alerts API](/api/alerts) — Alert rule configuration
- [Error Codes](/api/errors) — Complete error code reference

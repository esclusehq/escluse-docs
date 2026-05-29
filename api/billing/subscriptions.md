# Subscriptions

Manage your subscription plan and view subscription details.

## Current Subscription

```http
GET /api/v1/billing/subscriptions/current
```

Returns details about the currently active subscription.

### Example Request

::: code-group

```bash [curl]
curl -X GET https://api.esluce.com/api/v1/billing/subscriptions/current \
  -H "Authorization: Bearer ${ESCLUSE_API_KEY}"
```

```typescript [Node.js SDK]
const subscription = await client.subscriptions.getCurrent();
```

```python [Python SDK]
subscription = client.subscriptions.get_current()
```

:::

### Example Response

```json
{
  "data": {
    "id": "sub_abc123",
    "plan": "pro",
    "status": "active",
    "current_period_start": "2026-05-01T00:00:00Z",
    "current_period_end": "2026-06-01T00:00:00Z",
    "features": {
      "max_nodes": 3,
      "max_servers": 15,
      "modpack_support": true
    },
    "usage": {
      "servers": 3,
      "nodes": 1
    }
  }
}
```

### Possible Errors

| HTTP | Code | Description |
|------|------|-------------|
| 403 | `BIL_SUBSCRIPTION_EXPIRED` | Subscription has expired |

## Change Plan

To upgrade or downgrade your subscription plan, use the [Create Checkout Session](/api/billing) endpoint with the desired plan ID.

## Cancel Subscription

To cancel your subscription, visit the [Customer Portal](/api/billing#customer-portal).

## Refund Eligibility

| Time Since Subscription | Refund Type |
|------------------------|-------------|
| 0-7 days | Full refund |
| 8-30 days | Prorated refund |
| 30+ days | No refund |

### Related Pages

- [Billing API](/api/billing) — Checkout, plans, and invoices
- [Usage & Quotas](/api/usage) — Current resource usage
- [Error Codes](/api/errors) — Complete error code reference

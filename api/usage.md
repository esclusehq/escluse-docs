# Usage & Quotas

View current resource usage and plan quotas.

## Get Usage

```http
GET /api/v1/usage
```

Returns current resource usage across all servers and nodes.

### Example Response
```json
{
  "data": {
    "servers": { "current": 3, "limit": 15 },
    "nodes": { "current": 1, "limit": 3 },
    "storage_gb": { "used": 25.5, "limit": 100 },
    "bandwidth_gb": { "used": 150, "limit": 1000, "period": "monthly" }
  }
}
```

## Get Quotas

```http
GET /api/v1/usage/quotas
```

Returns detailed quota information per resource type.

### Possible Errors
| HTTP | Code | Description |
|------|------|-------------|
| 403 | `BIL_SUBSCRIPTION_EXPIRED` | Subscription has expired |

### Related Pages
- [Billing API](/api/billing) — Plan limits and upgrades
- [Error Codes](/api/errors) — Complete error code reference

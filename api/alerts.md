# Alerts API

Configure alert rules and view alert history for monitoring server and node events.

## Create Alert Rule

```http
POST /api/v1/alert-rules
```

Creates a new alert rule with conditions and notification targets.

### Request Body
```json
{
  "name": "High CPU Usage",
  "metric": "cpu_usage",
  "condition": "greater_than",
  "threshold": 90,
  "duration_seconds": 300,
  "actions": ["webhook", "email"]
}
```

## List Alert Rules

```http
GET /api/v1/alert-rules
```

## Get Alert Rule

```http
GET /api/v1/alert-rules/{id}
```

## Update Alert Rule

```http
PUT /api/v1/alert-rules/{id}
```

## Delete Alert Rule

```http
DELETE /api/v1/alert-rules/{id}
```

## Alert History

```http
GET /api/v1/alert-history
```

Retrieves the history of triggered alerts, including resolved and unresolved alerts.

### Possible Errors
| HTTP | Code | Description |
|------|------|-------------|
| 400 | `VAL_INVALID_FORMAT` | Invalid metric or condition value |
| 404 | `GEN_NOT_FOUND` | Alert rule not found |

### Related Pages
- [Webhooks API](/api/webhooks) — Webhook configuration
- [Error Codes](/api/errors) — Complete error code reference

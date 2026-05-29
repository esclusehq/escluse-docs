# Billing Webhooks

Escluse sends webhook events for subscription and billing lifecycle changes. Configure your webhook endpoint in the dashboard.

## Webhook Events

### Subscription Created

Sent when a new subscription is created after successful checkout.

```json
{
  "event": "subscription_created",
  "data": {
    "subscription_id": "sub_abc123",
    "plan": "pro",
    "customer_email": "user@example.com"
  }
}
```

### Subscription Updated

Sent when a subscription plan changes or is renewed.

```json
{
  "event": "subscription_updated",
  "data": {
    "subscription_id": "sub_abc123",
    "plan": "pro",
    "status": "active"
  }
}
```

### Subscription Canceled

Sent when a subscription is canceled.

```json
{
  "event": "subscription_canceled",
  "data": {
    "subscription_id": "sub_abc123",
    "effective_date": "2026-06-01T00:00:00Z"
  }
}
```

### Refund Processed

Sent when a refund has been processed.

```json
{
  "event": "refund_processed",
  "data": {
    "refund_id": "ref_xyz",
    "amount": 1500,
    "reason": "customer_request",
    "eligibility": {
      "type": "full",
      "days_since_subscription": 3
    }
  }
}
```

## Webhook Security

Webhook payloads are signed with HMAC-SHA256. Verify the signature before processing:

```javascript
const crypto = require('crypto');

function verifyWebhook(payload, signature, secret) {
  const hmac = crypto.createHmac('sha256', secret);
  const digest = hmac.update(payload).digest('hex');
  return crypto.timingSafeEqual(
    Buffer.from(digest),
    Buffer.from(signature)
  );
}
```

### Possible Errors

| HTTP | Code | Description |
|------|------|-------------|
| 400 | `BIL_WEBHOOK_SIGNATURE` | Webhook payload signature is invalid |

### Related Pages

- [Billing API](/api/billing) — Checkout, plans, and invoices
- [Error Codes](/api/errors) — Complete error code reference

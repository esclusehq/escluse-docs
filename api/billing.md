# Billing API

Manage subscriptions and payments via the REST API.

## Get Subscription

```http
GET /api/v1/billing/subscription
```

**Response:**
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
    }
  }
}
```

## Plans

| Plan | Price | Max Nodes | Max Servers | Features |
|------|-------|-----------|------------|---------|
| Starter | $5/mo | 1 | 5 | Basic support |
| Pro | $15/mo | 3 | 15 | Modpacks, priority support |
| Enterprise | Custom | Unlimited | Unlimited | Dedicated support |

## Create Checkout Session

Redirect user to Lemon Squeezy checkout:

```http
POST /api/v1/billing/checkout
```

**Request Body:**
```json
{
  "plan": "pro",
  "success_url": "https://app.esluce.com/billing?success=true",
  "cancel_url": "https://app.esluce.com/billing?canceled=true"
}
```

**Response:**
```json
{
  "data": {
    "checkout_url": "https://lemonsqueezy.com/checkout/..."
  }
}
```

## Get Invoices

```http
GET /api/v1/billing/invoices
```

**Response:**
```json
{
  "data": [
    {
      "id": "inv_abc123",
      "amount": 1500,
      "currency": "USD",
      "status": "paid",
      "created_at": "2026-05-01T00:00:00Z",
      "pdf_url": "https://app.esluce.com/invoices/inv_abc123.pdf"
    }
  ]
}
```

## Webhook Events

Escluse processes subscription events via webhooks:

### Subscription Created

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

## Refund Eligibility

| Time Since Subscription | Refund Type |
|------------------------|-------------|
| 0-7 days | Full refund |
| 8-30 days | Prorated refund |
| 30+ days | No refund |

## Webhook Security

Webhook payloads are signed. Verify signatures:

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

## Usage Limits

API enforces plan limits on server creation:

```json
{
  "error": {
    "code": "PLAN_LIMIT_EXCEEDED",
    "message": "Maximum servers (5) reached for Starter plan",
    "upgrade_url": "https://app.esluce.com/billing?upgrade=pro"
  }
}
```
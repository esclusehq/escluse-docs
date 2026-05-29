# Billing API

Manage subscriptions and payments via the REST API. Escluse uses Lemon Squeezy for payment processing.

## Plans

View available subscription plans:

| Plan | Price | Max Nodes | Max Servers | Features |
|------|-------|-----------|------------|---------|
| Starter | $5/mo | 1 | 5 | Basic support |
| Pro | $15/mo | 3 | 15 | Modpacks, priority support |
| Enterprise | Custom | Unlimited | Unlimited | Dedicated support |

## Get Subscription

```http
GET /api/v1/billing/subscription
```

Retrieves the currently active subscription details.

### Example Request

::: code-group

```bash [curl]
curl -X GET https://api.esluce.com/api/v1/billing/subscription \
  -H "Authorization: Bearer ${ESCLUSE_API_KEY}"
```

```typescript [Node.js SDK]
const subscription = await client.billing.getSubscription();
```

```python [Python SDK]
subscription = client.billing.get_subscription()
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
    }
  }
}
```

### Possible Errors

| HTTP | Code | Description |
|------|------|-------------|
| 403 | `BIL_SUBSCRIPTION_EXPIRED` | Subscription has expired |

---

## Create Checkout Session

```http
POST /api/v1/billing/checkout
```

Creates a Lemon Squeezy checkout session for subscription purchase or plan change.

### Request Body

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `plan` | string | Yes | Plan ID (`starter`, `pro`, `enterprise`) |
| `success_url` | string | Yes | Redirect URL after successful payment |
| `cancel_url` | string | Yes | Redirect URL if user cancels |

### Example Request

::: code-group

```bash [curl]
curl -X POST https://api.esluce.com/api/v1/billing/checkout \
  -H "Authorization: Bearer ${ESCLUSE_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{"plan": "pro", "success_url": "https://app.esluce.com/billing?success=true", "cancel_url": "https://app.esluce.com/billing?canceled=true"}'
```

```typescript [Node.js SDK]
const session = await client.billing.createCheckout({
  plan: 'pro',
  successUrl: 'https://app.esluce.com/billing?success=true',
  cancelUrl: 'https://app.esluce.com/billing?canceled=true'
});
```

```python [Python SDK]
session = client.billing.create_checkout(
  plan='pro',
  success_url='https://app.esluce.com/billing?success=true',
  cancel_url='https://app.esluce.com/billing?canceled=true'
)
```

:::

### Example Response

```json
{
  "data": {
    "checkout_url": "https://lemonsqueezy.com/checkout/..."
  }
}
```

---

## Customer Portal

```http
POST /api/v1/billing/portal
```

Generates a Lemon Squeezy customer portal URL for managing subscription, invoices, and billing details.

### Example Request

::: code-group

```bash [curl]
curl -X POST https://api.esluce.com/api/v1/billing/portal \
  -H "Authorization: Bearer ${ESCLUSE_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{"redirect_url": "https://app.esluce.com/billing"}'
```

```typescript [Node.js SDK]
const portal = await client.billing.getPortal({
  redirectUrl: 'https://app.esluce.com/billing'
});
```

```python [Python SDK]
portal = client.billing.get_portal(
  redirect_url='https://app.esluce.com/billing'
)
```

:::

---

## Get Invoices

```http
GET /api/v1/billing/invoices
```

Retrieves a list of past invoices.

### Example Request

::: code-group

```bash [curl]
curl -X GET https://api.esluce.com/api/v1/billing/invoices \
  -H "Authorization: Bearer ${ESCLUSE_API_KEY}"
```

```typescript [Node.js SDK]
const invoices = await client.billing.listInvoices();
```

```python [Python SDK]
invoices = client.billing.list_invoices()
```

:::

### Example Response

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

---

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

### Related Endpoints

For more billing management, see:
- [Subscriptions](/api/billing/subscriptions) — View and manage subscription details
- [Billing Webhooks](/api/billing/webhooks) — Webhook event types and security
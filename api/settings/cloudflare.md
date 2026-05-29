# Cloudflare DNS Settings

Configure Cloudflare DNS integration for automatic domain-to-IP mapping for game servers.

## Get Cloudflare Settings

```http
GET /api/v1/settings/cloudflare
```

Retrieves the current Cloudflare DNS configuration (secrets are masked).

## Update Cloudflare Settings

```http
PUT /api/v1/settings/cloudflare
```

Updates Cloudflare DNS configuration.

### Request Body
```json
{
  "api_token": "your_cloudflare_api_token",
  "zone_id": "your_cloudflare_zone_id",
  "auto_refresh": true
}
```

### Example Request

::: code-group

```bash [curl]
curl -X PUT https://api.esluce.com/api/v1/settings/cloudflare \
  -H "Authorization: Bearer ${ESCLUSE_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{"api_token": "your_cloudflare_api_token", "zone_id": "your_cloudflare_zone_id", "auto_refresh": true}'
```

```typescript [Node.js SDK]
await client.settings.updateCloudflare({
  apiToken: 'your_cloudflare_api_token',
  zoneId: 'your_cloudflare_zone_id',
  autoRefresh: true
});
```

```python [Python SDK]
client.settings.update_cloudflare(
  api_token='your_cloudflare_api_token',
  zone_id='your_cloudflare_zone_id',
  auto_refresh=True
)
```

:::

## Test Cloudflare Connection

```http
POST /api/v1/settings/cloudflare/test
```

Tests the Cloudflare API connection with the configured credentials.

### Possible Errors
| HTTP | Code | Description |
|------|------|-------------|
| 400 | `VAL_INVALID_FORMAT` | Invalid API token format |
| 400 | Test failed | Cloudflare API connection test failed |

### Related Pages
- [Nodes API](/api/nodes) — Node management (DNS is used for node-based servers)
- [Error Codes](/api/errors) — Complete error code reference

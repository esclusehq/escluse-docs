# Error Code Catalog

All API errors follow a standard JSON error response format (see [API Overview](/api/overview#response-format)). Each error includes a machine-readable `code` field, an HTTP status code, and a human-readable message.

Errors are organized by category below. Endpoint documentation pages link to specific error codes using anchor IDs (e.g., `/api/errors#AUTH_INVALID_CREDENTIALS`).

## Authentication Errors (AUTH_*)

Errors related to user authentication and authorization.

| Code | HTTP | Description | Cause |
|------|------|-------------|-------|
| <span id="AUTH_INVALID_CREDENTIALS">`AUTH_INVALID_CREDENTIALS`</span> | 401 | Email or password is incorrect | Wrong credentials |
| <span id="AUTH_TOKEN_EXPIRED">`AUTH_TOKEN_EXPIRED`</span> | 401 | Access token has expired | Token older than 1 hour |
| <span id="AUTH_TOKEN_INVALID">`AUTH_TOKEN_INVALID`</span> | 401 | Token is malformed or tampered | Invalid JWT format or signature |
| <span id="AUTH_MFA_REQUIRED">`AUTH_MFA_REQUIRED`</span> | 401 | MFA code required to complete login | MFA enabled but code not provided |
| <span id="AUTH_MFA_INVALID">`AUTH_MFA_INVALID`</span> | 401 | MFA code is invalid or expired | Wrong or expired MFA code |
| <span id="AUTH_EMAIL_NOT_VERIFIED">`AUTH_EMAIL_NOT_VERIFIED`</span> | 403 | Email address has not been verified | Registration email not confirmed |
| <span id="AUTH_RATE_LIMITED">`AUTH_RATE_LIMITED`</span> | 429 | Too many authentication attempts | Login/register rate limit exceeded |

## Server Errors (SRV_*)

Errors related to server CRUD operations and lifecycle management.

| Code | HTTP | Description | Cause |
|------|------|-------------|-------|
| <span id="SRV_NOT_FOUND">`SRV_NOT_FOUND`</span> | 404 | Server does not exist | Invalid `server_id` |
| <span id="SRV_LIMIT_REACHED">`SRV_LIMIT_REACHED`</span> | 403 | Maximum server count for plan reached | Upgrade plan to add more servers |
| <span id="SRV_INVALID_STATUS">`SRV_INVALID_STATUS`</span> | 409 | Server is not in the correct state for this action | e.g., starting a server that is already running |
| <span id="SRV_DEPLOY_FAILED">`SRV_DEPLOY_FAILED`</span> | 500 | Server deployment failed | Infrastructure or configuration error |

## Validation Errors (VAL_*)

Errors related to request input validation.

| Code | HTTP | Description | Cause |
|------|------|-------------|-------|
| <span id="VAL_REQUIRED_FIELD">`VAL_REQUIRED_FIELD`</span> | 400 | A required field is missing | Omitted required request field |
| <span id="VAL_INVALID_FORMAT">`VAL_INVALID_FORMAT`</span> | 400 | A field has an invalid format | Wrong data type, malformed UUID, invalid enum value |
| <span id="VAL_OUT_OF_RANGE">`VAL_OUT_OF_RANGE`</span> | 400 | A numeric field is outside allowed range | Value too low or too high |

## Billing Errors (BIL_*)

Errors related to subscriptions, payments, and billing operations.

| Code | HTTP | Description | Cause |
|------|------|-------------|-------|
| <span id="BIL_INSUFFICIENT_FUNDS">`BIL_INSUFFICIENT_FUNDS`</span> | 402 | Payment method has insufficient funds | Billing charge failed |
| <span id="BIL_PLAN_LIMIT">`BIL_PLAN_LIMIT`</span> | 403 | Operation exceeds current plan limits | Upgrade plan to proceed |
| <span id="BIL_SUBSCRIPTION_EXPIRED">`BIL_SUBSCRIPTION_EXPIRED`</span> | 403 | Subscription has expired | Renew subscription to continue |
| <span id="BIL_WEBHOOK_SIGNATURE">`BIL_WEBHOOK_SIGNATURE`</span> | 400 | Webhook payload signature is invalid | Mismatched webhook secret |

## Node Errors (NODE_*)

Errors related to compute nodes and their management.

| Code | HTTP | Description | Cause |
|------|------|-------------|-------|
| <span id="NODE_NOT_FOUND">`NODE_NOT_FOUND`</span> | 404 | Node does not exist | Invalid `node_id` |
| <span id="NODE_OFFLINE">`NODE_OFFLINE`</span> | 503 | Node is offline or unreachable | Node heartbeat lost |
| <span id="NODE_INSUFFICIENT_RESOURCES">`NODE_INSUFFICIENT_RESOURCES`</span> | 409 | Node does not have enough resources | Not enough CPU, RAM, or disk |
| <span id="NODE_KEY_INVALID">`NODE_KEY_INVALID`</span> | 401 | Node API key is invalid or revoked | Wrong or revoked `esk_` key |

## General Errors (GEN_*)

Errors not specific to any resource category.

| Code | HTTP | Description | Cause |
|------|------|-------------|-------|
| <span id="GEN_NOT_FOUND">`GEN_NOT_FOUND`</span> | 404 | Requested resource does not exist | Invalid resource ID |
| <span id="GEN_FORBIDDEN">`GEN_FORBIDDEN`</span> | 403 | Insufficient permissions | User does not have access |
| <span id="GEN_INTERNAL_ERROR">`GEN_INTERNAL_ERROR`</span> | 500 | Unexpected server error | Internal server failure |
| <span id="GEN_RATE_LIMITED">`GEN_RATE_LIMITED`</span> | 429 | Rate limit exceeded | Too many requests |
| <span id="GEN_DEPRECATED">`GEN_DEPRECATED`</span> | 410 | Endpoint has been deprecated | Use the updated endpoint |

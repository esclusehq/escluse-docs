# Authentication

The Escluse API supports two authentication methods depending on your use case:

- **User Authentication** (Supabase JWT) — for user-facing API calls from web and mobile apps
- **Node API Key Authentication** (esk_ keys) — for server agent registration and node-to-API communication

## Quick Reference

| Method | Token Format | Used For | Endpoints |
|--------|-------------|----------|-----------|
| User JWT | `eyJ...` (JWT) | User API calls | All `/api/v1/*` endpoints |
| Node API Key | `esk_...` | Node registration | `/api/v1/nodes/register`, agent WebSocket |

Which token should I use? — If you're calling the API from a web/mobile app as a user, use the User JWT. If you're registering a server node or building an agent integration, use a Node API Key.

---

## User Authentication (Supabase JWT)

User authentication is powered by Supabase Auth. The flow is: register or log in → receive JWT tokens → use the access token for API calls → refresh when expired.

### Authentication Flow

```mermaid
sequenceDiagram
    participant Dev as Developer
    participant API as Escluse API
    participant Supabase as Supabase Auth

    Dev->>API: POST /api/v1/auth/login {email, password}
    API->>Supabase: authenticate credentials
    Supabase-->>API: JWT access_token + refresh_token
    API-->>Dev: { access_token, refresh_token, user }

    Dev->>API: GET /api/v1/servers (Authorization: Bearer {token})
    API->>Supabase: verify JWT
    Supabase-->>API: user_id, role
    API-->>Dev: { data: [...] }
```

### Register

```http
POST /api/v1/auth/register
```

Creates a new user account. Email verification may be required before accessing certain features.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "secure-password",
  "name": "User Display Name"
}
```

::: code-group

```bash [curl]
curl -X POST https://api.esluce.com/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "secure-password", "name": "User Display Name"}'
```

```typescript [Node.js SDK]
import { Escluse } from '@escluse/sdk';

const client = new Escluse();
const { user, session } = await client.auth.register({
  email: 'user@example.com',
  password: 'secure-password',
  name: 'User Display Name'
});
```

```python [Python SDK]
from escluse import Escluse

client = Escluse()
result = client.auth.register(
  email="user@example.com",
  password="secure-password",
  name="User Display Name"
)
```

:::

**Response:**
```json
{
  "data": {
    "user": {
      "id": "usr_abc123",
      "email": "user@example.com",
      "name": "User Display Name",
      "email_verified": false
    },
    "session": {
      "access_token": "eyJ...",
      "refresh_token": "eyJ...",
      "expires_in": 3600
    }
  },
  "status": "success"
}
```

### Login

```http
POST /api/v1/auth/login
```

Authenticates with email and password, returning access and refresh tokens.

::: code-group

```bash [curl]
curl -X POST https://api.esluce.com/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "secure-password"}'
```

```typescript [Node.js SDK]
const { session } = await client.auth.login({
  email: 'user@example.com',
  password: 'secure-password'
});
```

```python [Python SDK]
result = client.auth.login(
  email="user@example.com",
  password="secure-password"
)
```

:::

### OAuth (Google / GitHub)

```http
POST /api/v1/auth/oauth
```

Authenticates via a third-party OAuth provider.

**Request Body:**
```json
{
  "provider": "google",
  "redirect_to": "https://app.esluce.com/auth/callback"
}
```

### Refresh Token

```http
POST /api/v1/auth/refresh
```

Exchanges a refresh token for a new access token. Access tokens expire after 1 hour.

::: code-group

```bash [curl]
curl -X POST https://api.esluce.com/api/v1/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{"refresh_token": "eyJ..."}'
```

```typescript [Node.js SDK]
const { session } = await client.auth.refreshToken();
// SDK handles token refresh automatically
```

```python [Python SDK]
session = client.auth.refresh_token()
```

:::

### Logout

```http
POST /api/v1/auth/logout
```

Invalidates the current session. Requires a valid access token in the Authorization header.

### Get Current User

```http
GET /api/v1/auth/me
```

Returns the authenticated user's profile.

### Forgot Password

```http
POST /api/v1/auth/forgot-password
```

Sends a password reset email to the specified address.

### Reset Password

```http
POST /api/v1/auth/reset-password
```

Resets the password using the token received via email.

**Request Body:**
```json
{
  "token": "reset-token-from-email",
  "password": "new-secure-password"
}
```

### Verify Email

```http
POST /api/v1/auth/verify-email
```

Verifies the user's email address using the token received via email.

**Request Body:**
```json
{
  "token": "verification-token-from-email"
}
```

### Multi-Factor Authentication (MFA)

MFA adds an additional layer of security by requiring a one-time code from an authenticator app.

**Flow:**
1. Enable MFA: `POST /api/v1/auth/mfa/enroll`
2. Verify setup: `POST /api/v1/auth/mfa/verify` with the generated code
3. Login with MFA: `POST /api/v1/auth/login` includes `mfa_code` field
4. Recovery: `POST /api/v1/auth/mfa/recovery` with a backup code

---

## Node API Key Authentication

Node API keys are used for agent-to-API communication and node registration. They have the prefix `esk_` and are managed per-node.

### Creating an API Key

```http
POST /api/v1/nodes/{id}/generate-key
```

::: code-group

```bash [curl]
curl -X POST https://api.esluce.com/api/v1/nodes/{id}/generate-key \
  -H "Authorization: Bearer {user_token}" \
  -H "Content-Type: application/json"
```

```typescript [Node.js SDK]
const key = await client.nodes.generateKey(nodeId);
```

```python [Python SDK]
key = client.nodes.generate_key(node_id)
```

:::

**Response:**
```json
{
  "data": {
    "id": "key_abc123",
    "key": "esk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "label": "default",
    "created_at": "2026-05-10T12:00:00Z"
  }
}
```

### Using the API Key

Node API keys are used in the `Authorization: Bearer` header, exactly like user JWT tokens:

```bash
curl -X POST https://api.esluce.com/api/v1/nodes/register \
  -H "Authorization: Bearer esk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" \
  -H "Content-Type: application/json" \
  -d '{"name": "Production Node 1"}'
```

### Managing API Keys

- **List keys:** `GET /api/v1/nodes/{id}/keys`
- **Revoke key:** `PUT /api/v1/nodes/{node_id}/keys/{key_id}/revoke`
- **Delete key:** `DELETE /api/v1/nodes/{node_id}/keys/{key_id}`

See [Node API Keys](/api/nodes/api-keys) for the complete API reference.

---

## Common Authentication Errors

| Error Code | HTTP | Description | Cause |
|------------|------|-------------|-------|
| AUTH_INVALID_CREDENTIALS | 401 | Email or password is incorrect | Wrong credentials |
| AUTH_TOKEN_EXPIRED | 401 | Access token has expired | Token older than 1 hour |
| AUTH_TOKEN_INVALID | 401 | Token is malformed or tampered | Invalid JWT signature |
| AUTH_MFA_REQUIRED | 401 | MFA code required to complete login | MFA enabled but code not provided |
| AUTH_EMAIL_NOT_VERIFIED | 403 | Email address has not been verified | Registration email not confirmed |

For the complete error catalog, see [Error Codes](/api/errors).

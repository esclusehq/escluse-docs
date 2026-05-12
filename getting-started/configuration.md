# Configuration

Advanced configuration options for the Escluse agent and API.

## Agent Configuration

The agent is configured via `/etc/escluse-agent/config.toml`:

### Basic Settings

```toml
# Required: API authentication
api_key = "esk_your_api_key"

# Required: API endpoint
api_url = "https://api.esluce.com"

# Optional: Display name for this node
node_name = "production-node-1"

# Optional: Data directory (default: /var/lib/escluse-agent)
data_dir = "/var/lib/escluse-agent"
```

### Network Settings

```toml
# WebSocket connection settings
ws_connect_timeout = 30
ws_ping_interval = 30
ws_max_retries = 5
ws_retry_delay = 5

# Heartbeat settings (sent to API for monitoring)
heartbeat_interval = 30
heartbeat_timeout = 60
```

### Logging

```toml
# Log level: trace, debug, info, warn, error
log_level = "info"

# Log output: file, console, or both
log_output = "file"

# Log directory
log_dir = "/var/log/escluse-agent"
log_max_size = "100MB"
log_max_backups = 5
```

### Docker Settings

```toml
# Docker socket path
docker_socket = "/var/run/docker.sock"

# Container network mode
container_network = "bridge"

# Default resource limits
default_cpu_limit = 2
default_memory_limit = "4GB"
```

## Environment Variables

Override config values with environment variables:

| Variable | Config Key | Example |
|----------|------------|---------|
| `ESCLUSE_API_KEY` | api_key | `esk_xxx` |
| `ESCLUSE_API_URL` | api_url | `https://api.esluce.com` |
| `ESCLUSE_LOG_LEVEL` | log_level | `debug` |
| `ESCLUSE_NODE_NAME` | node_name | `my-node` |

## API Configuration

### Request Format

All API requests require authentication:

```bash
curl -H "Authorization: Bearer {token}" \
     -H "Content-Type: application/json" \
     https://api.esluce.com/api/v1/{endpoint}
```

### Rate Limits

| Plan | Requests/minute | Concurrent Connections |
|------|----------------|----------------------|
| Starter | 60 | 10 |
| Pro | 300 | 50 |
| Enterprise | Unlimited | Unlimited |

## Security

### TLS/SSL

All API communication is encrypted over HTTPS.

### WebSocket Security

Agent connections use secure WebSocket (wss://) with certificate pinning.

### Firewall Rules

```bash
# Allow API communication
iptables -A INPUT -p tcp --dport 443 -j ACCEPT

# Allow game server ports (example: Minecraft)
iptables -A INPUT -p tcp --dport 25565 -j ACCEPT

# Allow agent internal API (optional)
iptables -A INPUT -p tcp --dport 8080 -s 10.0.0.0/8 -j ACCEPT
```

## Troubleshooting

### Agent Not Connecting

1. Check API key is correct
2. Verify network connectivity: `curl https://api.esluce.com/health`
3. Check logs: `sudo journalctl -u escluse-agent -n 50`

### Container Startup Issues

1. Verify Docker is running: `docker ps`
2. Check container logs: `docker logs {container_name}`
3. Ensure ports are available: `netstat -tlnp | grep 25565`

## Next Steps

- [API Reference](/api/overview) - Full API documentation
- [Server Management](/api/servers) - Server API endpoints
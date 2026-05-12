# Installation

This guide walks you through setting up Escluse for managing game servers.

## Prerequisites

- Node server (VPS, dedicated server, or local machine)
- Linux operating system (Ubuntu 20.04+, Debian 11+, or similar)
- Docker installed and running
- Minimum 2GB RAM and 20GB disk space

## Installing the Agent

The Escluse agent can be installed with a single command:

```bash
curl -sSL https://get.esluce.com/agent | bash
```

This installer will:
1. Download the latest agent binary
2. Create necessary directories
3. Set up the systemd service
4. Generate a unique node ID

## Configuration

Edit the configuration file at `/etc/escluse-agent/config.toml`:

```toml
# Required: Your API key from the dashboard
api_key = "your-api-key-here"

# Required: The API URL
api_url = "https://api.esluce.com"

# Optional: Node display name
node_name = "My Game Server"

# Optional: Heartbeat interval in seconds (default: 30)
heartbeat_interval = 30
```

## Starting the Agent

```bash
# Enable the service to start on boot
sudo systemctl enable escluse-agent

# Start the service
sudo systemctl start escluse-agent

# Check the status
sudo systemctl status escluse-agent
```

## Verifying Installation

Check the agent logs to confirm successful connection:

```bash
sudo journalctl -u escluse-agent -f
```

You should see logs indicating successful WebSocket connection to the API.

## Docker Requirements

The agent uses Docker to manage game server containers. Ensure Docker is installed:

```bash
# Check Docker is installed
docker --version

# Check Docker is running
sudo systemctl status docker
```

## Firewall Configuration

Ensure the following ports are open:

| Port | Protocol | Service |
|------|----------|---------|
| 8080 | TCP | Agent API (optional) |
| 25565 | TCP | Minecraft default |
| 8211 | TCP | Palworld default |

## Next Steps

- [Quick Start Guide](/getting-started/quick-start) - Get your first server running
- [Configuration](/getting-started/configuration) - Advanced configuration options
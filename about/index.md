# About Escluse

Escluse is a modern game server hosting platform that makes it easy to deploy, manage, and monitor game servers. Built with a focus on simplicity, security, and scalability.

## What is Escluse?

Escluse is an open-source game server management platform that provides:

- **Instant Deployment** - Deploy game servers in seconds, not hours
- **Agent-Based Architecture** - Lightweight agent runs on your nodes for seamless server control
- **Real-Time Monitoring** - Track server health, resource usage, and player activity
- **Multi-Game Support** - Support for Minecraft, Palworld, CS2, Rust, and more
- **Built-in Billing** - Integrated subscription management with Lemon Squeezy

## Feature Reference

| Feature | Description |
|---------|-------------|
| **One-Click Deploy** | Deploy game servers with a single click |
| **Agent Management** | Run agent on nodes for server control |
| **Real-Time Stats** | Monitor CPU, RAM, disk in real-time |
| **WebSocket API** | Secure real-time communication |
| **Auto SSL** | Automatic certificate management |
| **Multi-Node** | Manage servers across multiple nodes |
| **Billing** | Built-in subscription management |
| **Backups** | Automated server backups |
| **REST API** | Full REST API for automation |

## Quick Start

```bash
# Install the agent on your node
curl -sSL https://get.esluce.com/agent | bash

# Configure your API key in /etc/escluse-agent/config.toml
api_key = "your-api-key"
api_url = "https://api.escluse.com"

# Start the agent
sudo systemctl start escluse-agent
```
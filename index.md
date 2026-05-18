---
layout: home
title: Escluse - Game Server Hosting Platform
titleTemplate: false

hero:
  name: Escluse
  text: "Game Server Hosting Platform"
  tagline: Deploy, manage, and monitor game servers with minimal configuration
  actions:
    - theme: brand
      text: Get Started
      link: /getting-started/installation
    - theme: alt
      text: View on GitHub
      link: https://github.com/esclusehq

features:
  - icon: 🚀
    title: One-Click Deployment
    details: Deploy Minecraft, Palworld, Bedrock Edition and more with a single click
  - icon: 🔧
    title: Agent-Based Management
    details: Lightweight agent runs on your nodes, enabling seamless server control
  - icon: 📊
    title: Real-Time Monitoring
    details: Track CPU, RAM, disk usage and server status in real-time
  - icon: 🔒
    title: Secure by Default
    details: Secure WebSocket communication with automatic certificate management
  - icon: 💳
    title: Billing Integration
    details: Built-in subscription management with Lemon Squeezy
  - icon: 🌐
    title: Multi-Node Support
    details: Manage servers across multiple nodes from a single dashboard
---

## About Escluse

Escluse is a modern game server hosting platform that makes it easy to deploy, manage, and monitor game servers. Built with a focus on simplicity, security, and scalability.

### What is Escluse?

Escluse is an open-source game server management platform that provides:

- **Instant Deployment** - Deploy game servers in seconds, not hours
- **Agent-Based Architecture** - Lightweight agent runs on your nodes for seamless server control
- **Real-Time Monitoring** - Track server health, resource usage, and player activity
- **Multi-Game Support** - Support for Minecraft, Palworld, CS2, Rust, and more
- **Built-in Billing** - Integrated subscription management with Lemon Squeezy

### Feature Reference

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

---

<div style="text-align: center; margin-top: 3rem;">
  <h2>Quick Start</h2>

```bash
# Install the agent on your node
curl -sSL https://get.esluce.com/agent | bash

# Configure your API key in /etc/escluse-agent/config.toml
api_key = "your-api-key"
api_url = "https://api.escluse.com"

# Start the agent
sudo systemctl start escluse-agent
```

</div>
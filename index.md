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
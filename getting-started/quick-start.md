# Quick Start

Get your first game server running in minutes.

## Step 1: Register a Node

After installing the agent, register your node in the dashboard:

1. Log in to your Esluce dashboard at https://app.esluce.com
2. Navigate to **Nodes** → **Add Node**
3. Copy the API key shown in the setup instructions

## Step 2: Configure the Agent

On your node, edit the configuration:

```bash
sudo nano /etc/escluse-agent/config.toml
```

Set your API key:
```toml
api_key = "esk_your_api_key_here"
api_url = "https://api.esluce.com"
```

Restart the agent:
```bash
sudo systemctl restart escluse-agent
```

## Step 3: Create a Server

From the dashboard:

1. Click **Create Server**
2. Select game type (Minecraft, Palworld, Bedrock, etc.)
3. Choose server resources (2GB, 4GB, 8GB, or 16GB)
4. Configure server name and settings
5. Click **Deploy**

The agent will automatically:
- Pull the correct Docker image
- Allocate ports
- Configure resource limits
- Start the server

## Step 4: Access Your Server

Once deployed, access server details from the dashboard:
- **IP Address**: Your node's IP
- **Port**: Allocated game port
- **Console**: Real-time server console via WebSocket

### Minecraft Example

```
Server Address: your-node-ip:25565
```

## Managing Your Server

### Start/Stop

Use the dashboard buttons or API:

```bash
curl -X POST https://api.esluce.com/api/v1/servers/{id}/start \
  -H "Authorization: Bearer {token}"
```

### Console Access

View real-time logs and send commands via the dashboard console tab.

### File Management

Upload plugins, mods, and configurations via the built-in file manager.

## Next Steps

- [Configuration Guide](/getting-started/configuration) - Fine-tune your setup
- [API Reference](/api/overview) - Automate with the API
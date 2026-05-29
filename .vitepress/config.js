import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Escluse',
  description: 'Game Server Hosting Platform - Deploy, manage, and monitor game servers with ease',

  themeConfig: {
    logo: '/logo.svg',
    nav: [
      { text: 'Getting Started', link: '/getting-started/installation' },
      { text: 'About', link: '/about/' },
      { text: 'API Reference', link: '/api/overview' }
    ],
    sidebar: {
      '/': [
        {
          text: 'About Escluse',
          collapsed: false,
          items: [
            { text: 'Overview', link: '/about/' },
            { text: 'What is Escluse?', link: '/about/#what-is-escluse' },
            { text: 'Feature Reference', link: '/about/#feature-reference' }
          ]
        },
        {
          text: 'Getting Started',
          collapsed: false,
          items: [
            { text: 'Introduction', link: '/' },
            { text: 'Installation', link: '/getting-started/installation' },
            { text: 'Quick Start', link: '/getting-started/quick-start' },
            { text: 'Configuration', link: '/getting-started/configuration' }
          ]
        },
        {
          text: 'API Reference',
          collapsed: false,
          items: [
            { text: 'Overview', link: '/api/overview' },
            { text: 'Authentication', link: '/api/auth' },
            {
              text: 'Servers',
              collapsed: true,
              items: [
                { text: 'Server CRUD', link: '/api/servers' },
                { text: 'Operations', link: '/api/servers/operations' },
                { text: 'File Management', link: '/api/servers/files' },
                { text: 'Console & Logs', link: '/api/servers/console' },
                { text: 'Backups', link: '/api/servers/backups' },
                { text: 'Plugins', link: '/api/servers/plugins' },
                { text: 'Git Operations', link: '/api/servers/git' },
                { text: 'Build System', link: '/api/servers/build' },
                { text: 'Deployment', link: '/api/servers/deploy' },
                { text: 'Profiling', link: '/api/servers/profiling' },
                { text: 'Server Properties', link: '/api/servers/properties' },
                { text: 'Cron Tasks', link: '/api/servers/cron-tasks' },
              ]
            },
            {
              text: 'Nodes',
              collapsed: true,
              items: [
                { text: 'Node Management', link: '/api/nodes' },
                { text: 'API Keys', link: '/api/nodes/api-keys' },
                { text: 'Registration Tokens', link: '/api/nodes/registration' },
                { text: 'Node Commands', link: '/api/nodes/commands' },
                { text: 'WebSocket Connection', link: '/api/nodes/websocket' },
              ]
            },
            {
              text: 'Billing',
              collapsed: true,
              items: [
                { text: 'Overview', link: '/api/billing' },
                { text: 'Subscriptions', link: '/api/billing/subscriptions' },
                { text: 'Webhooks', link: '/api/billing/webhooks' },
              ]
            },
            { text: 'Webhooks', link: '/api/webhooks' },
            { text: 'Alerts', link: '/api/alerts' },
            {
              text: 'Settings',
              collapsed: true,
              items: [
                { text: 'S3 Storage', link: '/api/settings/s3' },
                { text: 'Cloudflare DNS', link: '/api/settings/cloudflare' },
              ]
            },
            {
              text: 'Templates',
              collapsed: true,
              items: [
                { text: 'Server Templates', link: '/api/templates/server' },
                { text: 'Plugin Templates', link: '/api/templates/plugins' },
                { text: 'Modpack Templates', link: '/api/templates/modpacks' },
              ]
            },
            { text: 'Agents', link: '/api/agents' },
            { text: 'Jobs', link: '/api/jobs' },
            { text: 'Usage & Quotas', link: '/api/usage' },
            { text: 'Runtimes', link: '/api/runtimes' },
            { text: 'Deploy API', link: '/api/deploy' },
            { text: 'Error Codes', link: '/api/errors' },
            {
              text: 'SDKs',
              collapsed: true,
              items: [
                { text: 'Node.js', link: '/api/sdks/node' },
                { text: 'Python', link: '/api/sdks/python' },
              ]
            },
            { text: 'Changelog', link: '/api/changelog' },
          ]
        }
      ],
      '/getting-started/': [
        {
          text: 'About Escluse',
          collapsed: false,
          items: [
            { text: 'Overview', link: '/about/' },
            { text: 'What is Escluse?', link: '/about/#what-is-escluse' },
            { text: 'Feature Reference', link: '/about/#feature-reference' }
          ]
        },
        {
          text: 'Getting Started',
          collapsed: false,
          items: [
            { text: 'Introduction', link: '/' },
            { text: 'Installation', link: '/getting-started/installation' },
            { text: 'Quick Start', link: '/getting-started/quick-start' },
            { text: 'Configuration', link: '/getting-started/configuration' }
          ]
        },
        {
          text: 'API Reference',
          collapsed: false,
          items: [
            { text: 'Overview', link: '/api/overview' },
            { text: 'Authentication', link: '/api/auth' },
            {
              text: 'Servers',
              collapsed: true,
              items: [
                { text: 'Server CRUD', link: '/api/servers' },
                { text: 'Operations', link: '/api/servers/operations' },
                { text: 'File Management', link: '/api/servers/files' },
                { text: 'Console & Logs', link: '/api/servers/console' },
                { text: 'Backups', link: '/api/servers/backups' },
                { text: 'Plugins', link: '/api/servers/plugins' },
                { text: 'Git Operations', link: '/api/servers/git' },
                { text: 'Build System', link: '/api/servers/build' },
                { text: 'Deployment', link: '/api/servers/deploy' },
                { text: 'Profiling', link: '/api/servers/profiling' },
                { text: 'Server Properties', link: '/api/servers/properties' },
                { text: 'Cron Tasks', link: '/api/servers/cron-tasks' },
              ]
            },
            {
              text: 'Nodes',
              collapsed: true,
              items: [
                { text: 'Node Management', link: '/api/nodes' },
                { text: 'API Keys', link: '/api/nodes/api-keys' },
                { text: 'Registration Tokens', link: '/api/nodes/registration' },
                { text: 'Node Commands', link: '/api/nodes/commands' },
                { text: 'WebSocket Connection', link: '/api/nodes/websocket' },
              ]
            },
            {
              text: 'Billing',
              collapsed: true,
              items: [
                { text: 'Overview', link: '/api/billing' },
                { text: 'Subscriptions', link: '/api/billing/subscriptions' },
                { text: 'Webhooks', link: '/api/billing/webhooks' },
              ]
            },
            { text: 'Webhooks', link: '/api/webhooks' },
            { text: 'Alerts', link: '/api/alerts' },
            {
              text: 'Settings',
              collapsed: true,
              items: [
                { text: 'S3 Storage', link: '/api/settings/s3' },
                { text: 'Cloudflare DNS', link: '/api/settings/cloudflare' },
              ]
            },
            {
              text: 'Templates',
              collapsed: true,
              items: [
                { text: 'Server Templates', link: '/api/templates/server' },
                { text: 'Plugin Templates', link: '/api/templates/plugins' },
                { text: 'Modpack Templates', link: '/api/templates/modpacks' },
              ]
            },
            { text: 'Agents', link: '/api/agents' },
            { text: 'Jobs', link: '/api/jobs' },
            { text: 'Usage & Quotas', link: '/api/usage' },
            { text: 'Runtimes', link: '/api/runtimes' },
            { text: 'Deploy API', link: '/api/deploy' },
            { text: 'Error Codes', link: '/api/errors' },
            {
              text: 'SDKs',
              collapsed: true,
              items: [
                { text: 'Node.js', link: '/api/sdks/node' },
                { text: 'Python', link: '/api/sdks/python' },
              ]
            },
            { text: 'Changelog', link: '/api/changelog' },
          ]
        }
      ],
      '/api/': [
        {
          text: 'About Escluse',
          collapsed: false,
          items: [
            { text: 'Overview', link: '/about/' },
            { text: 'What is Escluse?', link: '/about/#what-is-escluse' },
            { text: 'Feature Reference', link: '/about/#feature-reference' }
          ]
        },
        {
          text: 'Getting Started',
          collapsed: false,
          items: [
            { text: 'Introduction', link: '/' },
            { text: 'Installation', link: '/getting-started/installation' },
            { text: 'Quick Start', link: '/getting-started/quick-start' },
            { text: 'Configuration', link: '/getting-started/configuration' }
          ]
        },
        {
          text: 'API Reference',
          collapsed: false,
          items: [
            { text: 'Overview', link: '/api/overview' },
            { text: 'Authentication', link: '/api/auth' },
            {
              text: 'Servers',
              collapsed: true,
              items: [
                { text: 'Server CRUD', link: '/api/servers' },
                { text: 'Operations', link: '/api/servers/operations' },
                { text: 'File Management', link: '/api/servers/files' },
                { text: 'Console & Logs', link: '/api/servers/console' },
                { text: 'Backups', link: '/api/servers/backups' },
                { text: 'Plugins', link: '/api/servers/plugins' },
                { text: 'Git Operations', link: '/api/servers/git' },
                { text: 'Build System', link: '/api/servers/build' },
                { text: 'Deployment', link: '/api/servers/deploy' },
                { text: 'Profiling', link: '/api/servers/profiling' },
                { text: 'Server Properties', link: '/api/servers/properties' },
                { text: 'Cron Tasks', link: '/api/servers/cron-tasks' },
              ]
            },
            {
              text: 'Nodes',
              collapsed: true,
              items: [
                { text: 'Node Management', link: '/api/nodes' },
                { text: 'API Keys', link: '/api/nodes/api-keys' },
                { text: 'Registration Tokens', link: '/api/nodes/registration' },
                { text: 'Node Commands', link: '/api/nodes/commands' },
                { text: 'WebSocket Connection', link: '/api/nodes/websocket' },
              ]
            },
            {
              text: 'Billing',
              collapsed: true,
              items: [
                { text: 'Overview', link: '/api/billing' },
                { text: 'Subscriptions', link: '/api/billing/subscriptions' },
                { text: 'Webhooks', link: '/api/billing/webhooks' },
              ]
            },
            { text: 'Webhooks', link: '/api/webhooks' },
            { text: 'Alerts', link: '/api/alerts' },
            {
              text: 'Settings',
              collapsed: true,
              items: [
                { text: 'S3 Storage', link: '/api/settings/s3' },
                { text: 'Cloudflare DNS', link: '/api/settings/cloudflare' },
              ]
            },
            {
              text: 'Templates',
              collapsed: true,
              items: [
                { text: 'Server Templates', link: '/api/templates/server' },
                { text: 'Plugin Templates', link: '/api/templates/plugins' },
                { text: 'Modpack Templates', link: '/api/templates/modpacks' },
              ]
            },
            { text: 'Agents', link: '/api/agents' },
            { text: 'Jobs', link: '/api/jobs' },
            { text: 'Usage & Quotas', link: '/api/usage' },
            { text: 'Runtimes', link: '/api/runtimes' },
            { text: 'Deploy API', link: '/api/deploy' },
            { text: 'Error Codes', link: '/api/errors' },
            {
              text: 'SDKs',
              collapsed: true,
              items: [
                { text: 'Node.js', link: '/api/sdks/node' },
                { text: 'Python', link: '/api/sdks/python' },
              ]
            },
            { text: 'Changelog', link: '/api/changelog' },
          ]
        }
      ],
      '/about/': [
        {
          text: 'About Escluse',
          collapsed: false,
          items: [
            { text: 'Overview', link: '/about/' },
            { text: 'What is Escluse?', link: '/about/#what-is-escluse' },
            { text: 'Feature Reference', link: '/about/#feature-reference' }
          ]
        },
        {
          text: 'Getting Started',
          collapsed: false,
          items: [
            { text: 'Introduction', link: '/' },
            { text: 'Installation', link: '/getting-started/installation' },
            { text: 'Quick Start', link: '/getting-started/quick-start' },
            { text: 'Configuration', link: '/getting-started/configuration' }
          ]
        },
        {
          text: 'API Reference',
          collapsed: false,
          items: [
            { text: 'Overview', link: '/api/overview' },
            { text: 'Authentication', link: '/api/auth' },
            {
              text: 'Servers',
              collapsed: true,
              items: [
                { text: 'Server CRUD', link: '/api/servers' },
                { text: 'Operations', link: '/api/servers/operations' },
                { text: 'File Management', link: '/api/servers/files' },
                { text: 'Console & Logs', link: '/api/servers/console' },
                { text: 'Backups', link: '/api/servers/backups' },
                { text: 'Plugins', link: '/api/servers/plugins' },
                { text: 'Git Operations', link: '/api/servers/git' },
                { text: 'Build System', link: '/api/servers/build' },
                { text: 'Deployment', link: '/api/servers/deploy' },
                { text: 'Profiling', link: '/api/servers/profiling' },
                { text: 'Server Properties', link: '/api/servers/properties' },
                { text: 'Cron Tasks', link: '/api/servers/cron-tasks' },
              ]
            },
            {
              text: 'Nodes',
              collapsed: true,
              items: [
                { text: 'Node Management', link: '/api/nodes' },
                { text: 'API Keys', link: '/api/nodes/api-keys' },
                { text: 'Registration Tokens', link: '/api/nodes/registration' },
                { text: 'Node Commands', link: '/api/nodes/commands' },
                { text: 'WebSocket Connection', link: '/api/nodes/websocket' },
              ]
            },
            {
              text: 'Billing',
              collapsed: true,
              items: [
                { text: 'Overview', link: '/api/billing' },
                { text: 'Subscriptions', link: '/api/billing/subscriptions' },
                { text: 'Webhooks', link: '/api/billing/webhooks' },
              ]
            },
            { text: 'Webhooks', link: '/api/webhooks' },
            { text: 'Alerts', link: '/api/alerts' },
            {
              text: 'Settings',
              collapsed: true,
              items: [
                { text: 'S3 Storage', link: '/api/settings/s3' },
                { text: 'Cloudflare DNS', link: '/api/settings/cloudflare' },
              ]
            },
            {
              text: 'Templates',
              collapsed: true,
              items: [
                { text: 'Server Templates', link: '/api/templates/server' },
                { text: 'Plugin Templates', link: '/api/templates/plugins' },
                { text: 'Modpack Templates', link: '/api/templates/modpacks' },
              ]
            },
            { text: 'Agents', link: '/api/agents' },
            { text: 'Jobs', link: '/api/jobs' },
            { text: 'Usage & Quotas', link: '/api/usage' },
            { text: 'Runtimes', link: '/api/runtimes' },
            { text: 'Deploy API', link: '/api/deploy' },
            { text: 'Error Codes', link: '/api/errors' },
            {
              text: 'SDKs',
              collapsed: true,
              items: [
                { text: 'Node.js', link: '/api/sdks/node' },
                { text: 'Python', link: '/api/sdks/python' },
              ]
            },
            { text: 'Changelog', link: '/api/changelog' },
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/esclusehq' }
    ]
  },

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],

  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    }
  }
})
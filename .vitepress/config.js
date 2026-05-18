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
          items: [
            { text: 'Overview', link: '/api/overview' },
            { text: 'Servers', link: '/api/servers' },
            { text: 'Nodes', link: '/api/nodes' },
            { text: 'Billing', link: '/api/billing' }
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
          items: [
            { text: 'Overview', link: '/api/overview' },
            { text: 'Servers', link: '/api/servers' },
            { text: 'Nodes', link: '/api/nodes' },
            { text: 'Billing', link: '/api/billing' }
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
            { text: 'Servers', link: '/api/servers' },
            { text: 'Nodes', link: '/api/nodes' },
            { text: 'Billing', link: '/api/billing' }
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
            { text: 'Servers', link: '/api/servers' },
            { text: 'Nodes', link: '/api/nodes' },
            { text: 'Billing', link: '/api/billing' }
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
import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Escluse',
  description: 'Game Server Hosting Platform - Deploy, manage, and monitor game servers with ease',

  themeConfig: {
    logo: '/logo.svg',
    nav: [
      { text: 'Getting Started', link: '/getting-started/' },
      { text: 'API Reference', link: '/api/overview' }
    ],
    sidebar: [
      {
        text: 'Getting Started',
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
    socialLinks: [
      { icon: 'github', link: 'https://github.com/esclusehq/escluse-docs' }
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
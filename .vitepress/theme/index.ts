import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import './custom.css'

import OpenApiSchema from '../components/OpenApiSchema.vue'
import StaticSchema from '../components/StaticSchema.vue'

export default {
  extends: DefaultTheme,
  async enhanceApp({ app }) {
    // Register custom schema components globally (per D-02)
    app.component('OpenApiSchema', OpenApiSchema)
    app.component('StaticSchema', StaticSchema)

    // Title bar navigation to landing page
    app.mixin({
      mounted() {
        this.$nextTick(() => {
          const title = document.querySelector('.VPNavBarTitle')
          if (title && !title.hasAttribute('data-escluse-linked')) {
            title.setAttribute('data-escluse-linked', 'true')
            title.style.cursor = 'pointer'
            title.addEventListener('click', () => {
              window.location.href = 'https://esluce.com'
            })
          }
        })
      }
    })
  }
} satisfies Theme

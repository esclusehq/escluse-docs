import DefaultTheme from 'vitepress/theme'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
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
}
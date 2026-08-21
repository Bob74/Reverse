import { defineConfig } from 'vitepress'
import { ImagePreviewPlugin } from 'vitepress-plugin-image-preview'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'fr-FR',
  title: "Carnets d'exploration numérique",
  description: "Notes, expériences et writeups pour comprendre les programmes, un octet à la fois.",
  cleanUrls: true,
  lastUpdated: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    lastUpdated: {
      text: 'Dernière mise à jour '
    },
    
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Bob74' }
    ]
  },
  vite: {
    plugins: [
      // https://www.npmjs.com/package/vitepress-plugin-image-preview
      ImagePreviewPlugin(
        {
          showProgress: true,
          hideOnClickModal: true
        }
      )
    ]
  }
})

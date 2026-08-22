import { defineConfig } from 'vitepress'
import { ImagePreviewPlugin } from 'vitepress-plugin-image-preview'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  // Nom du dépôt Github
  base: '/Reverse/',
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
      { text: 'Accueil', link: '/' }
    ],

    sidebar: [
      {
        text: 'Catégories',
        items: [
          { text: 'Writeups', link: '/writeups/' },
          { text: 'Outils', link: '/outils/' },
          { text: 'Méthodes', link: '/méthodes/' },
          { text: 'Rappels fondamentaux', link: '/fondamentaux/' },
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

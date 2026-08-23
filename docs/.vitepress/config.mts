import { defineConfig } from 'vitepress'
import { ImagePreviewPlugin } from 'vitepress-plugin-image-preview'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  // Nom du dépôt Github
  base: '/Reverse/',
  lang: 'fr',
  title: "Carnets d'Explo. Numérique",
  description: "Notes, expériences et writeups pour comprendre les programmes, un octet à la fois.",
  cleanUrls: true,
  lastUpdated: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    lastUpdated: {
      text: 'Dernière mise à jour '
    },
    docFooter: {
      prev: 'Page précédente',
      next: 'Page suivante'
    },
    outline: {
      label: 'Sommaire'
    },
    langMenuLabel: 'Changer de langue',
    returnToTopLabel: 'Retour en haut de page',
    sidebarMenuLabel: 'Menu',
    darkModeSwitchLabel: 'Apparence',
    lightModeSwitchTitle: 'Passer au thème clair',
    darkModeSwitchTitle: 'Passer au thème sombre',
  
    nav: [
      { text: 'Accueil', link: '/' }
    ],

    sidebar: [
      {
        text: 'Catégories',
        items: [
          { text: 'Writeups', link: '/writeups/' },
          { text: 'Outils', link: '/outils/' },
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
  },
  markdown: {
    container: {
      tipLabel: 'ℹ️ Note',
      dangerLabel: '⚠️ Attention !'
    },
    codeCopyButton: {
      tooltipText: 'Copier le code',
      copiedText: 'Copié'
    }
  },
})

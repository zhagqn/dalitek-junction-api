module.exports = {
  plugins: [
    require('./plugin.js')
  ],
  locales: {
    '/': {
      lang: 'en-US',
      title: 'DalitekJunctionApi',
      description: 'DalitekJunctionApi for Vue.js'
    }
  },
  themeConfig: {
    repo: '/dalitek-junction-api',
    docsDir: 'docs',
    locales: {
      '/': {
        label: 'English',
        selectText: 'Languages',
        editLinkText: 'Edit this page on GitHub',
        nav: [{
          text: 'Release Notes',
          link: 'https://github.com//dalitek-junction-api/releases'
        }],
        sidebar: [
          '/installation.md',
          '/started.md',
        ]
      }
    }
  }
}

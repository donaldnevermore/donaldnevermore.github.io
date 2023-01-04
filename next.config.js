const withNextra = require('nextra')({
    theme: 'nextra-theme-blog',
    themeConfig: './theme.config.jsx',
    staticImage: true,
    defaultShowCopyCode: true,
    readingTime: true,
  })

  module.exports = withNextra({
    reactStrictMode: true,
    images: {
        unoptimized: true,
    }
  })

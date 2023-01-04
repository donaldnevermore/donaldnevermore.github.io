const isProd = process.env.NODE_ENV === 'production'

const withNextra = require('nextra')({
    theme: 'nextra-theme-blog',
    themeConfig: './theme.config.jsx',
    staticImage: true,
    defaultShowCopyCode: true,
    readingTime: true,
  })

  module.exports = withNextra({
    assetPrefix: isProd ? '/donaldnevermore.github.io/' : '',
    reactStrictMode: true,
    images: {
        unoptimized: true,
    }
  })

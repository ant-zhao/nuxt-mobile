module.exports = {
  mode: 'universal',
  env: {
    HOST: process.env.NODE_ENV === 'development' ? 'dev' : process.env.HOST
  },
  /*
   ** Headers of the page
   */
  head: {
    title: '普道科技',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    link: [{ rel: 'shortcut icon', href: '/favicon.ico' }],
    script: [
      //需要头部引入的插件
      { src: 'https://hm.baidu.com/hm.js?ee5ab2688cf083060a7980f9256e569a' }
    ],
    __dangerouslyDisableSanitizers: ['script']
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '@/assets/style/main.css',
    //'@/assets/style/iconfont/iconfont.css',
    'swiper/dist/css/swiper.css'
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '@/plugins/element-ui', ssr: true },
    { src: '@/plugins/untils', ssr: false },
    { src: '~/plugins/handleData', ssr: true },
    { src: '~/plugins/mixin', ssr: true },
    { src: '~/plugins/rem', ssr: true },
    { src: '~/plugins/filters', ssr: true },
    { src: '~/plugins/swiper', ssr: false },
    { src: '~/plugins/encrypt', ssr: false },
    { src: '~/plugins/Base64', ssr: false },
    { src: '~/plugins/autotextarea', ssr: false }
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/proxy',
    '@nuxtjs/router'
    //'@nuxtjs/eslint-module'
  ],
  styleResources: {
    scss: './assets/variables.scss',
    less: './assets/**/*.less'
    // sass: ...
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  loaders: [
    {
      test: /\.(png|jpe?g|gif|svg|cur|ico)$/,
      loader: 'url-loader',
      query: {
        limit: 1000, // 1KO
        name: 'img/[name].[hash].[ext]'
      }
    },
    {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      query: {
        limit: 1000, // 1 KO
        name: 'fonts/[name].[hash:7].[ext]'
      }
    }
  ],
  /**
   * router config
   */
  router: {
    middleware: 'redirect',
    extendRoutes(routes, resolve) {
      const list = [];
      routes.push(...list);
    }
  },
  server: {
    port: 3006, // default: 3000
    host: '0.0.0.0' // default: localhost
  },
  /*
   ** Build configuration
   */
  build: {
    transpile: [/^element-ui/],
    extractCSS: true,
    optimization: {
      namedChunks: true,
      moduleIds: 'hashed',
      splitChunks: {
        maxInitialRequests: 6,
        cacheGroups: {
          dll: {
            chunks: 'all',
            test: /[\\/]node_modules[\\/](jquery|core-js|vue|vue-router)[\\/]/,
            name: 'dll',
            priority: 2,
            enforce: true,
            reuseExistingChunk: true
          },
          superSlide: {
            chunks: 'all',
            test: /[\\/]src[\\/]assets[\\/]js[\\/]/,
            name: 'superSlide',
            priority: 1,
            enforce: true,
            reuseExistingChunk: true
          },
          commons: {
            name: 'commons',
            minChunks: 2, //Math.ceil(pages.length / 3), 当你有多个页面时，获取pages.length，至少被1/3页面的引入才打入common包
            chunks: 'all',
            reuseExistingChunk: true
          }
        }
      },
      runtimeChunk: {
        name: 'manifest'
      }
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },
  proxy: [
    [
      '/api',
      {
        context: ['/'],
        secure: false,
        target: 'https://www.paat.vip',
        pathRewrite: { '^/api': '/' }
      }
    ]
  ]
};

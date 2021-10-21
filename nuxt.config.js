import { bdTj } from "./static/baidu.js";
const path = require('path');
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const productionGzipExtensions = /\.(js|ts|css|json|txt|html|ico|svg)(\?.*)?$/i;
function resolve (dir) {
    return path.join(__dirname, dir)
}
export default {
    env: {
        HOST: process.env.NODE_ENV === "development" ? "dev" : process.env.HOST
    },
    /*
    ** Nuxt target
    ** See https://nuxtjs.org/api/configuration-target
    */
    target: 'server',
    /*
    ** Headers of the page
    ** See https://nuxtjs.org/api/configuration-head
    */
    head: {
        title: "名人名言_名言名句_唯美句子_文案句子_句子迷 - 读好句",
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no' },
            { name: "Expires", content: "0" },
            { name: "Pragma", content: "no-cache" },
            { name: "Cache-control", content: "no-cache" },
            { name: "Cache", content: "no-cache" },
            { hid: "keywords", name: "keywords", content: `名人名言,名言名句,唯美的句子,伤感的句子,文案句子,句子迷,读好句,优美句子` },
            { hid: 'description', name: 'description', content: '读好句提供最新文案句子,包括名人名言,名言名句,唯美的句子,伤感的句子,文案句子,适合发朋友圈的句子,优美句子等，为广大句子迷收集各种有深度有品味的句子,适合各种心情的句子。读好句，发现好文案！' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            { rel: "shortcut icon", href: "/favicon.ico" },
        ],
        script: [
            {
                src: "https://res2.wx.qq.com/open/js/jweixin-1.4.0.js",
                async: true,
                defer: true
            },
            {
                src:
                    "https://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js",
                async: true,
                defer: true
            },
            {
                src:
                    "https://rescdn.qqmail.com/node/ww/wwopenmng/js/sso/wwLogin-1.0.0.js",
                async: true,
                defer: true
            }
        ],
        __dangerouslyDisableSanitizers: ["script"]
    },
    loading: { color: "#ff7931" },
    /*
    ** Global CSS
    */
    css: [
        'swiper/css/swiper.min.css',
        "@/assets/styles/common.less",
        "@/assets/styles/base.less",
        "@/assets/styles/global.css",
        "@/assets/styles/re-vant.less",
        "@/assets/iconfonts/iconfont.css",
    ],
    /*
    ** Plugins to load before mounting the App
    ** https://nuxtjs.org/guide/plugins
    */
    plugins: [
        { src: "@/utils", mode: 'client' },
        { src: "@/plugins/mixin", ssr: true },
        { src: "@/plugins/vant", ssr: true },
        { src: "@/plugins/filters", ssr: true },
        { src: "@/plugins/route", mode: 'client' },
        { src: "@/plugins/wxshare", mode: 'client' },
        { src: "@/plugins/tj" },
        { src: "@/plugins/html2canvas", mode: 'client' },
        { src: "~/plugins/swiper", mode: 'client' },
        { src: "~/plugins/icons" }
    ],
    /*
    ** Auto import components
    ** See https://nuxtjs.org/api/configuration-components
    */
    components: true,
    /*
    ** Nuxt.js dev-modules
    */
    buildModules: [],
    /*
    ** Nuxt.js modules
    */
    modules: [
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios', '@nuxtjs/proxy'
    ],
    /*
    ** Axios module configuration
    ** See https://axios.nuxtjs.org/options
    */
    axios: {
        proxy: true
    },
    proxy: {
        "/share": {
            target: "https://talk.paat.vip",
            pathRewrite: {
                "^/share": "/share"
            }
        },
        "/serverApi": {
            target: "https://www.duhaoju.com",
            pathRewrite: {
                "^/serverApi": "/serverApi"
            }
        },
        "/read": {
            target: "http://19z48230w8.eicp.vip:15294",
            pathRewrite: {
                "^/read": ""
            }
        }
    },
    router: {
        mode: 'history',
        middleware: "redirect",
        fallback: true
    },
    //部署服务端口配置
    server: {
        port: 3002, // default: 3000
        host: "0.0.0.0" // default: localhost
    },
    /*
    ** Build configuration
    ** See https://nuxtjs.org/api/configuration-build/
    */
    build: {
        extractCSS: { allChunks: true },
        transpile: [ /vant.*?less/ ], 
        optimization: {
            namedChunks: true,
            moduleIds: "hashed",
            splitChunks: {
                maxInitialRequests: 6,
                cacheGroups: {
                    dll: {
                        chunks: "all",
                        test: /[\\/]node_modules[\\/](jquery|core-js|vue|vue-router)[\\/]/,
                        name: "dll",
                        priority: 2,
                        enforce: true,
                        reuseExistingChunk: true
                    },
                    superSlide: {
                        chunks: "all",
                        test: /[\\/]assets[\\/]styles[\\/]/,
                        name: "superSlide",
                        priority: 1,
                        enforce: true,
                        reuseExistingChunk: true
                    },
                    commons: {
                        name: "commons",
                        minChunks: 2, //Math.ceil(pages.length / 3), 当你有多个页面时，获取pages.length，至少被1/3页面的引入才打入common包
                        chunks: "all",
                        reuseExistingChunk: true
                    }
                }
            },
            runtimeChunk: {
                name: "manifest"
            }
        },
        babel: {
            plugins: [
                ['import', {
                    libraryName: 'vant',
                    style: (name) => {
                        return `${name}/style/less.js`
                    }
                }, 'vant']
            ],
            presets({ isServer }) {
                return [
                    [
                        require.resolve('@nuxt/babel-preset-app'),
                        {
                            buildTarget: isServer ? 'server' : 'client',
                            corejs: { version: 3 }
                        }
                    ]
                ]
            }
        },
        extend(config, ctx) {
            const plugins = [];
            // Begin 生成 gzip 压缩文件
            plugins.push(
                new CompressionWebpackPlugin({
                    filename: "[path].gz[query]",
                    algorithm: "gzip",
                    test: productionGzipExtensions,
                    threshold: 10240,
                    minRatio: 0.8
                })
            );
            // End 生成 gzip 压缩文件
            
            // 配置svg-icon
            const svgRule = config.module.rules.find(rule => rule.test.test('.svg'))
            svgRule.exclude = [resolve('plugins/icons/svg')]
            
            config.module.rules.push({
                test: /\.svg$/,
                include: [resolve('plugins/icons/svg')],
                loader: 'svg-sprite-loader',
                options: {
                    symbolId: 'icon-[name]',
                },
            })

            
            config.module.rules.push({
                test: /\.less?$/,
                loader: "less-loader",
                options: {
                    lessOptions: {
                        javascriptEnabled: true
                    }
                }
            })

            config.plugins = [...config.plugins, ...plugins];
        },
    }
}

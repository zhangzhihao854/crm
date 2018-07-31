// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../vueProject/index.html'),
    assetsRoot: path.resolve(__dirname, '../vueProject'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    // port: 1411,//预生产
    //port: 8081,//测试
    //port: 6399,//正式
    port: 8080,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',

    assetsPublicPath: '/',
    proxyTable: {
      '/CRMNewMobile': {
        //target: 'http://192.168.1.199:8080',//潘文涛服务器
       //target: 'http://192.168.1.193:8082', //泮正辉服务器地址
        target: 'http://192.168.1.172:8080', //王涛
        //target: 'http://221.195.137.135:8081', //测试服务地址
        // target: 'http://222.223.182.30:1411',//预生产环境
        //target: 'http://www.crcbcrm.com/', //正式服务器

       // target: 'http://localhost:8080/',

        changeOrigin: true,
        pathRewrite: {
          '^/CRMNewMobile': '/CRMNewMobile'
        }
      },
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}

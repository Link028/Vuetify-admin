const svgoConfig = require('./config/svgo-config.json');

module.exports = {

  devServer: {
    proxy: {
      '/api/app-system': {
        target: 'http://localhost:8181',
        pathRewrite: { '^/api': '' },
        ws: false,
        changeOrigin: true
      },
    },
    host: '127.0.0.1',
    port: 8090,
    https: false,
    open: false,
	  headers:{ 'Access-Control-Allow-Origin': '*' },
	  disableHostCheck: true,
    hotOnly: false,
  },

  // babel-loader no-ignore node_modules/*
  "transpileDependencies": [],
  //"transpileDependencies": ["vuetify"],

  lintOnSave: process.env.NODE_ENV !== 'production',
  // disable source map in production
  productionSourceMap: false,
  //runtimeCompiler: true,

  css: {
    sourceMap: true,
    loaderOptions: {
      less: {
        modifyVars: {},
        javascriptEnabled: true
      }
    }
  },    
    
  chainWebpack: config => {
    // �޸� `svg` Loader
    const svgRule = config.module.rule('svg');

    // svgRule.uses.clear();
    svgRule
      .exclude
        .add(/src\/components\/svg-icons\/icons/)
        .end()

    // ���� `svg-sprite-loader` Loader
    config.module
      .rule('svgicons')
      .test(/\.svg$/)
      .include
        .add(/src\/components\/svg-icons\/icons/)
        .end()
      .use('svg-sprite-loader')
        .loader('svg-sprite-loader')
        .options({
          symbolId: 'icon-[name]',
        })
        .end()
      .use('svgo-loader')
        .loader('svgo-loader')
        .options(svgoConfig)
    // config.resolve
    //   .symlinks(true)
  }

}
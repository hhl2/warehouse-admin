const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    port: 8081,
    proxy: {

      '/api': {
        target: 'http://10.151.223.203:8010',  // 更新为实际的API服务器地址
        changeOrigin: true,
        logLevel: "debug",
        pathRewrite: {
          '^/api': ''  // 移除 /api 前缀，避免重复
        }

        // rewrite: path => path.replace(/^\/api/, ''),
        // Headers:{
        //   'Access-control-Allow-origin':'*',
        // }
      },

    },
  },
  outputDir: 'dist',
  assetsDir: 'assets',
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  productionSourceMap: false,

  css: {
    extract: true,
    sourceMap: false,
    loaderOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";`
      }
    }
  },

  // 添加 chainWebpack 配置来处理 SCSS 问题
  // chainWebpack: (config) => {
  //   // 配置 SCSS 规则
  //   config.module
  //     .rule('scss')
  //     .oneOf('vue')
  //     .use('sass-loader')
  //     .tap(options => ({
  //       ...options,
  //       // 添加 sass 选项来处理编译问题
  //       sassOptions: {
  //         quietDeps: true, // 减少依赖警告
  //         outputStyle: 'expanded' // 开发时保持可读格式
  //       }
  //     }))

  //   // 只在生产环境禁用压缩来排查问题（临时方案）
  //   if (process.env.NODE_ENV === 'production') {
  //     config.optimization.minimize(false)
  //   }
  // }
})
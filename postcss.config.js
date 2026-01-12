// postcss.config.js
module.exports = {
    plugins: {
        'postcss-px-to-viewport': {
            // 设计稿尺寸（你的设计稿是1300x731）
            viewportWidth: 1920,    // 设计稿宽度
            viewportHeight: 1080,    // 设计稿高度

            // 转换配置
            unitToConvert: 'px',    // 要转换的单位
            unitPrecision: 3,       // 转换精度，小数点位数
            propList: ['*'],        // 指定可以转换的CSS属性，*表示所有
            viewportUnit: 'vw',     // 转换后的视口单位
            fontViewportUnit: 'vw', // 字体转换后的单位

            // 排除列表
            selectorBlackList: [
                '.ignore',           // 忽略.ignore类
                '.hairlines',        // 忽略.hairlines类  
                /^\.no-vw/,         // 忽略所有.no-vw开头的类
                // 'el-',              // 忽略element-ui组件（如果有）
                'ant-',             // 忽略ant-design组件（如果有）
                /\.border-1px$/  // 忽略所有border-1px结尾的类
            ],

            // 其他配置
            minPixelValue: 2,      // 最小转换值，小于1px不转换
            mediaQuery: false,     // 媒体查询中的px是否转换
            replace: true,         // 直接替换值而不是添加备用
            exclude: [/node_modules/], // 排除node_modules中的文件

            // 横屏配置（可选）
            landscape: false,      // 是否处理横屏
            landscapeUnit: 'vw',   // 横屏单位
            landscapeWidth: 731    // 横屏宽度
        }
    }
}
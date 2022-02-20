const path = require('path')
const CompressionPlugin = require('compression-webpack-plugin')

module.exports = {
    entry: {
        app: ['@babel/polyfill', './src/app.js']
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'app.bundle.js'
    },
    module: {
        rules: [
            // 处理js文件
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['@babel/preset-env'],
                },
            },
            // 处理着色器语言
            {
                test: /\.(glsl|vs|fs|vert|frag)$/,
                exclude: /node_modules/,
                use: ['raw-loader'],
            }
        ]
    },
    performance: {

        hints: "warning", // 枚举

        maxAssetSize: 300000, // 整数类型（以字节为单位）

        maxEntrypointSize: 500000, // 整数类型（以字节为单位）

        assetFilter: function(assetFilename) {

            // 提供资源文件名的断言函数

            return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');

        }

    },
    plugins: [new CompressionPlugin()],
    devServer: {
        contentBase: path.join(__dirname, ''),
        compress: true,
        watchContentBase: true,
        port: 8082, // 端口
        host: 'localhost', //IP
        disableHostCheck: true,
    },
    // 配置node
    node: {
        fs: 'empty'
    }
}
const webpack = require('webpack');

module.exports = {
    entry: [
        './src/main.ts',
    ],
    output: {
        filename: '[name].js',
    },
    target: 'node',
    mode: 'none',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        // 表示只进行语法转换而不进行类型检查，可以加速构建过程
                        // 同时可以避免webpack构建时因为类型检查报错而导致构建失败
                        transpileOnly: true,
                    },
                },
                exclude: /node_modules/
            }
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },    
}

const webpack = require('webpack');

module.exports = {
    entry: [
        'webpack/hot/poll?1000',
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
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
}

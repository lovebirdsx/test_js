module.exports = {
    entry: {
        main: './src/main.ts',
    },
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
        extensions: ['.ts']
    },
}

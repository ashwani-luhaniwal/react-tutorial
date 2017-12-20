var config = {
    entry: './main.js',
    output: {
        path: '/',
        filename: 'bundle.js',
    },
    devServer: {
        inline: true,
        port: 3000
    },
    externals: {
        'react': 'React'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    }
}
module.exports = config;
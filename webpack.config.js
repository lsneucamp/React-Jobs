var path = require('path');

var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    devtool: 'eval',
    entry: {
        app: './src/public/app'
    },
    output: {
        path: path.resolve(__dirname, "public/assets"),
        publicPath: "/assets/",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            // BABEL LOADER
            {
                test: /\.js?$/,
                include: path.join(__dirname, 'src'),
                loaders: ['react-hot', 'babel']
            },
            // IMAGE LOADER
            {
                test: /\.jpe?g$|\.gif$|\.png$|\.svg$/,
                exclude: /node_modules|assets\/fonts/,
                loader: "file"
            },
            // FONT LOADER
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                exclude: /assets\/images/,
                loader: 'file?name=[name].[ext]'
            },
            //SASS
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('css!sass')
            }
        ]
    },
    // Use the plugin to specify the resulting filename (and add needed behavior to the compiler)
    plugins: [
        new ExtractTextPlugin("bundle.css")
    ]
};

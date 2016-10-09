var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    context: __dirname + "/src/public",
    entry: './app.js',
    output: {
        filename: "bundle.js",
        path: __dirname + "/public/assets",
    },
    // devtool: "source-map",
    module: {
        loaders: [
            // BABEL LOADER
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loaders: ["babel"]
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
    ],
    devServer: {
        publicPath: './public',
        contentBase: './public',
        historyApiFallback: true
    }
};
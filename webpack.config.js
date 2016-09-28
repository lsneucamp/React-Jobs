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
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loaders: ["babel"]
            },
            //SASS
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('css!sass')
            }
            ,{ test: /\.jpe?g$|\.gif$|\.png$|\.svg$/, loader: "file" }
        ]
    },
    // Use the plugin to specify the resulting filename (and add needed behavior to the compiler)
    plugins: [
        new ExtractTextPlugin("bundle.css")
    ]
};
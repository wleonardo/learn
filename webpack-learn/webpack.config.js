const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        vendor: ["lodash"],
        app: './src/app.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash].js'
    },
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
            // necessary to consistently work with multiple chunks via CommonsChunkPlugin
            chunksSortMode: 'dependency'
        }),
        new CleanWebpackPlugin(['dist']),
        new webpack.HashedModuleIdsPlugin({
            hashFunction: 'sha256',
            hashDigest: 'hex',
            hashDigestLength: 20
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "common",
            // (the commons chunk name)

            filename: "common.js",
            // (the filename of the commons chunk)

            minChunks: 2,
            // (Modules must be shared between 3 entries)
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "manifest",
            // (the commons chunk name)

            // filename: "manifest.[chunkhash].js",
            // (the filename of the commons chunk)

            minChunks: Infinity,
            // (Modules must be shared between 3 entries)
        })
    ],
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader?cacheDirectory'
            }
        }]
    }
};

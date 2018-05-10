const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const vendors = [
    'react',
    'react-dom',
    'react-router',
    'react-router-dom'
];

module.exports = {
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'output'),
        filename: '[name].[hash].js',
        library: '[name]'
    },
    entry: {
        'vendors': vendors,
    },
    plugins: [
        new CleanWebpackPlugin(['output']),
        new webpack.DllPlugin({
            path: 'manifest.json',
            name: '[name]',
            context: __dirname,
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            inject: 'body',
            hash: false,
            minify: {
                removeComments: true,
                collapseWhitespace: false
            }
        })
    ],
};

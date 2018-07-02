const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const BUILD_PATH = path.resolve(__dirname, 'output');
const assetsName = '[name].[hash:8].[ext]';
const webpackConfig = require('./webpack.config');
const manifest = require('./manifest.json');

const postcssConfig = require('./postcss.config');

module.exports = {
    mode: 'production',
    entry: webpackConfig.entry,
    output: webpackConfig.output,
    module: {
        rules: [
            // eslint 校验，影响速度
            {
                enforce: 'pre',
                test: /\.js?$/,
                exclude: /(node_modules)/,
                use: [
                    {
                        loader: 'eslint-loader',
                        options: {
                            cache: true,
                            quiet: true
                        }
                    }
                ]
            },
            {
                test: /\.js?$/,
                exclude: /(node_modules)/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: postcssConfig()
                    },
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: postcssConfig()
                    },
                    'sass-loader',
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: assetsName,
                            outputPath: 'medias'
                        }
                    },
                ]
            },
            {
                test: /\.(woff|woff2|svg|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: assetsName,
                            outputPath: 'fonts'
                        }
                    }
                ]
            }
        ]
    },
    resolve: webpackConfig.resolve,
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(BUILD_PATH, 'index.html'),
            filename: 'index.html',
            inject: 'body'
        }),
        new webpack.DefinePlugin({
            __DEV__: process.env.NODE_ENV,
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: manifest
        }),
        new MiniCssExtractPlugin({
            filename: 'style.[chunkhash].css',
            chunkFilename: '[id].css'
        }),
        new OptimizeCSSAssetsPlugin({
            cssProcessorOptions: { discardComments: { removeAll: true } }
        })
    ]
};

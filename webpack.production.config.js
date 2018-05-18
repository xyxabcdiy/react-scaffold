const path = require('path');
const glob = require('glob-all');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');

const SRC_PATH = path.resolve(__dirname, 'src');
const BUILD_PATH = path.resolve(__dirname, 'output');
const assetsName = '[name].[hash:8].[ext]';
const webpackConfig = require('./webpack.config');
const manifest = require('./manifest.json');

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
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['react', 'env', 'stage-1'],
                        plugins: [
                            'react-html-attrs',
                            'transform-class-properties',
                            'transform-decorators-legacy',
                            'react-hot-loader/babel'
                        ]
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
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
            title: '凯叔讲故事',
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
            cssProcessorOptions: {discardComments: {removeAll: true}}
        }),
        // 移除无用的CSS, 影响打包速度
        new PurifyCSSPlugin({
            paths: glob.sync([
                path.join(SRC_PATH, 'index.html'),
                path.join(SRC_PATH, '**/*.js'),
            ])
        })
    ]
};

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const ROOT_PATH = path.resolve(__dirname);
const SRC_PATH = path.resolve(__dirname, 'src');
const BUILD_PATH = path.resolve(ROOT_PATH, 'dist');

const COMPONENTS_PATH = path.resolve(SRC_PATH, 'components');
const STYLES_PATH = path.resolve(SRC_PATH, 'styles');
const MEDIAS_PATH = path.resolve(SRC_PATH, 'medias');
const MODULES_PATH = path.resolve(SRC_PATH, 'modules');
const LIBS_PATH = path.resolve(SRC_PATH, 'libs');
const UTILS_PATH = path.resolve(SRC_PATH, 'utils');

const postcssConfig = require('./postcss.config');

module.exports = {
    mode: 'development',
    entry: path.resolve(SRC_PATH, 'index.js'),
    devtool: 'eval-source-map',
    output: {
        path: BUILD_PATH,
        filename: '[name].[hash].min.js',
        chunkFilename: '[name].[chunkhash:5].chunk.js',
        publicPath: '/',
    },
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
                            emitWarning: true
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
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: postcssConfig()
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: postcssConfig()
                    },
                    'sass-loader',
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'url-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
    resolve: {
        alias: {
            Styles: STYLES_PATH,
            Medias: MEDIAS_PATH,
            Components: COMPONENTS_PATH,
            Utils: UTILS_PATH,
            Modules: MODULES_PATH,
            Libs: LIBS_PATH
        },
        extensions: ['.js', '.scss', '.sass', '.css', '.json'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(SRC_PATH, 'index.html')
        }),
        new webpack.DefinePlugin({
            __DEV__: process.env.NODE_ENV,
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        hot: true,
        contentBase: './output',
        disableHostCheck: true,
        historyApiFallback: true,
        port: 7777,
        proxy: {
            '/tapi/**': {
                target: 'http://weixin.kaishustory.com/tapi',
                secure: false,
                changeOrigin: true,
                pathRewrite: {
                    '^/tapi': ''
                }
            },
            '/sapi/**': {
                target: 'http://weixin.kaishustory.com',
                secure: false,
                changeOrigin: true,
                pathRewrite: {
                    '^/sapi': ''
                }
            }
        }
    }
};

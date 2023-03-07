/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ReactRefreshTypeScript = require('react-refresh-typescript');
const MiniCssExtractPluguin = require('mini-css-extract-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = (env, argv) => {

    return {
        mode: isDevelopment ? 'development' : 'production',
        output: {
            filename: '[name].[contenthash].js',
            path: path.resolve(__dirname, 'build'),
            assetModuleFilename: "assets/[hash][ext][query]"
        },

        optimization: {
            runtimeChunk: {
                name: 'runtime'

            },
            splitChunks: {
                chunks: 'all', //default: async; initial | async | all
                cacheGroups: {
                    //webpack caching priorities
                    vendors: {
                        minSize: 0, //size when caching
                        name: 'vendors',
                        priority: 1,
                        test: /[\\/]node_modules[\\/]/
                    },

                    react: {
                        name: 'react',
                        priority: 2,
                        test: /[\\/]node_modules[\\/](react|react-dom)/
                    },

                    asyncModules:{
                        minSize: 0,
                        chunks: 'async',
                        name:'dynamic'
                    }
                }
            }
        },

        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    include: path.join(__dirname, 'src'),
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                //pollyfill required for supporting navigators => takes more time to compile
                                // [
                                //     '@babel/preset-env', { targets: "defaults", "debug": true, "useBuiltIns": "usage", "corejs": 3 }
                                // ],
                                [
                                    '@babel/preset-react', { runtime: "automatic" } //not necessary import react
                                ]
                            ]
                        }
                    }
                },
                {
                    test: /\.css$/,
                    use: [
                        argv.mode === 'production' ? MiniCssExtractPluguin.loader : 'style-loader', 'css-loader']
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
                    type: 'asset/resource',
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/i,
                    type: 'asset/resource',
                },
                {
                    test: /\.tsx?$/,
                    include: path.join(__dirname, 'src'),
                    use: [
                        {
                            loader: 'ts-loader',
                            options: {
                                configFile: isDevelopment ? 'tsconfig.dev.json' : 'tsconfig.json',
                                transpileOnly: true,
                                ...(isDevelopment && {
                                    getCustomTransformers: () => ({
                                        before: [ReactRefreshTypeScript()],
                                    }),
                                }),
                            },
                        },
                    ],
                },
            ]
        },
        plugins: [
            new MiniCssExtractPluguin({
                filename: 'styles.[contenthash].css'
            }),
            isDevelopment && new ReactRefreshWebpackPlugin(),
            new ForkTsCheckerWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: './public/index.html',
                favicon: "./public/favicon.ico",
                title: 'Fast refresh app'
            }),
        ].filter(Boolean),
        devServer: {
            open: true, // open navigator
            port: 3000,
            compress: true,
            hot: true,
            //routing config
            historyApiFallback: true,
            // eslint-disable-next-line no-dupe-keys
            historyApiFallback: {
                disableDotRule: true
            },
            client: { overlay: true }, //errors are shown in the web
        },
        devtool: isDevelopment ? 'source-map' : 'inline-source-map',//view source as original files (takes more time to compile)
        resolve: {
            extensions: ['.tsx', '.ts', '.jsx', '.js'],  //accept both extensions on src files
        },
    };
};
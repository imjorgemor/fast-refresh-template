const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const path = require('path');

module.exports = (env, argv) => {
    const { mode } = argv;
    const isProduction = mode === 'production';

    return {
        output: {
            filename: isProduction
                ? '[name].[contenthash].js'
                : 'main.js',
            path: path.resolve(__dirname, 'build'),
            assetModuleFilename: "assets/[hash][ext][query]"
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
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
                    use: ['style-loader', 'css-loader']
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
                    type: 'asset/resource',
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/i,
                    type: 'asset/resource',
                },
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './public/index.html',
                favicon: "./public/favicon.ico",

            }),
            new ReactRefreshWebpackPlugin(),
        ],
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
        },
        devtool: isProduction ?'source-map' : 'inline-source-map'//view source as original files (takes more time to compile)
    };
};
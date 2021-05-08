import { Configuration } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

import path from "path";

const Config: Configuration = {
    context: path.resolve(__dirname, ".."),
    entry: [
        "@babel/polyfill",
        path.join(__dirname, "..", "src", "index.tsx"),
    ],
    output: {
        filename: "js/[name].[chunkhash].js",
        chunkFilename: "js/[name].[chunkhash].chunk.js",
        crossOriginLoading: "use-credentials",
        publicPath: "/",
    },
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000,
        ignored: /[\\/](node_modules|dist)[\\/]/,
    },
    performance: {
        assetFilter: (filename: string) => /\.gz$/.test(filename),
        maxAssetSize: 512000,
    },
    stats: {
        colors: true,
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // all options are optional
            filename: "css/[chunkhash].css",
            chunkFilename: "css/[chunkhash].css",
            ignoreOrder: false, // Enable to remove warnings about conflicting order
        }),
        new HtmlWebpackPlugin({
            template: path.join("src", "index.html"),
            cache: true,
            xhtml: true,
        }),
    ],
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    module: {
        rules: [{
            test: /\.html$/,
            loader: "html-loader",
        }, {
            test: /\.(png|jpg|jpeg|svg)$/,
            loader: "url-loader",
            options: {
                limit: 8192,
                publicPath: "/assets/",
                outputPath: "assets/",
            },
            // }, {
            //     test: /\.(ttf|woff2?)$/,
            //     loader: "file-loader",
            //     options: {
            //         publicPath: "/css/fonts/",
            //         outputPath: "css/fonts/",
            //     },
        }, {
            test: /\.tsx?$/,
            loader: "babel-loader",
        }, {
            test: /\.s?css$/,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: "css-loader",
                    options: { importLoaders: 1 },
                },
                {
                    loader: "postcss-loader",
                    options: {
                        postcssOptions: {
                            plugins: [
                                [
                                    "postcss-preset-env",
                                    {}
                                ],
                            ],
                        },
                    },
                },
                {
                    loader: "sass-loader",
                },
                {
                    loader: "sass-resources-loader",
                    options: {
                        resources: [
                            path.join("src", "scss", "_variables.scss"),
                        ],
                    },
                },
            ],
        }],
    },
};

export default Config;

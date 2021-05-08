import common from "./webpack.common";

import { CleanWebpackPlugin } from "clean-webpack-plugin";
import CompressionPlugin from "compression-webpack-plugin";
import RobotstxtPlugin from "robotstxt-webpack-plugin";
import { Configuration } from "webpack";
import { merge } from "webpack-merge";

const prodConfig: Configuration = {
    mode: "production",
    devtool: false,
    plugins: [
        new CleanWebpackPlugin(),
        new CompressionPlugin({
            exclude: "index.html" // required for nginx substitutions
        }),
        new RobotstxtPlugin({
            policy: [{
                userAgent: "*",
                disallow: "/",
            }],
        }),
    ],
    optimization: {
        splitChunks: {
            chunks: "all",
        },
    },
};

const Config = () => {
    return merge<Configuration>(common, prodConfig);
};

export default Config;

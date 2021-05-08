import common from "./webpack.common";
import path from "path";
import { env } from "process";
import { Configuration } from "webpack";
import webpackDevServer from 'webpack-dev-server';
import { merge } from "webpack-merge";

const Config = () => {
    const devConfig: Configuration = {
        mode: "development",
        devtool: "eval-source-map",
        devServer: {
            port: 3000,
            historyApiFallback: true,
            proxy: {},
            stats: "minimal",
        },
        plugins: [],
    };

    return merge(common, devConfig);
};

export default Config;

module.exports = {
    parserOptions: {
        tsconfigRootDir: __dirname,
        project: "tsconfig.json",
    },
    root: true,
    rules: {
        "react-hooks/exhaustive-deps": "off", // https://github.com/facebook/react/issues/20204
    },
};

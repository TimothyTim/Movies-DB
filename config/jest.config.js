module.exports = {
    clearMocks: true,
    collectCoverage: false,
    moduleFileExtensions: [
        "js",
        "ts",
        "tsx",
    ],
    moduleNameMapper: {
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/config/loaderStub.js",
        "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    },
    modulePathIgnorePatterns: [
        "^@types/",
    ],
    rootDir: "../src",
    setupFilesAfterEnv: [
        "../jest-setup.ts",
    ],
    testEnvironment: "jest-environment-jsdom",
    testPathIgnorePatterns: [
        "/node_modules/",
    ],
    transform: {
        "\.[jt]sx?$": [
            "babel-jest", {
                configFile: "./config/jest.babel.config.js",
            },
        ],
    },
};

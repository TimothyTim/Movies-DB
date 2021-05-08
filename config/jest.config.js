module.exports = {
    clearMocks: true,
    collectCoverage: false,
    moduleFileExtensions: [
        "js",
        "ts",
        "tsx",
    ],
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

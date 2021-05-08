const config = require("../babel.config.json");

// Use the same as global config - but build for NodeJS instead of a browser!
const presets = config.presets;
for (let i = 0; i < presets.length; i++) {
    if (presets[i] === "@babel/env") {
        presets[i] = [
            "@babel/env", {
                "targets": {
                    "node": "current"
                },
            },
        ];
        break;
    }
}

module.exports = config;

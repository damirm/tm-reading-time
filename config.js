var config = {
    plugin: {
        version: "1.0.0",
        name: "TM reading time",
        description: "Browser extension for display the time needed for reading article",
        domains: JSON.stringify([
            "*://habrahabr.ru/post/*",
            "*://habrahabr.ru/company/*/blog/*",
            "*://geektimes.ru/post/*",
            "*://geektimes.ru/company/*/blog/*",
            "*://megamozg.ru/post/*",
            "*://megamozg.ru/company/*/blog/*"
        ]),

        homepage: "https://github.com/damirm/tm-reading-time.git",
        author: "Makhmutov Damir",

        license: "MIT"
    }
};

module.exports = config;
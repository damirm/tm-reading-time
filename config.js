var config = {
    plugin: {
        version: "1.0.3",
        name: "TM reading time",
        description: "Browser extension for display the time needed for reading article",
        domains: JSON.stringify([
            "*://habrahabr.ru/*", 
            "*://geektimes.ru/*", 
            "*://megamozg.ru/*"
        ]),

        homepage: "https://github.com/damirm/tm-reading-time.git",
        author: "Makhmutov Damir",

        license: "MIT",

        apiUrl: "https://noble-linker-95212.appspot.com"
    }
};

module.exports = config;
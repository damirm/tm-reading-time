var config = {
    plugin: {
        version: "1.0.5",
        name: "TM reading time",
        description: "Browser extension for display the time needed for reading article",
        longDescription: "Расширение добавляет бейджи с временем, необходимым для прочтения статьи на сайтах habrahabr.ru, geektimes.ru, megamozg.ru",

        domains: JSON.stringify([
            "*://habrahabr.ru/*", 
            "*://geektimes.ru/*", 
            "*://megamozg.ru/*"
        ]),

        domainsFirefox: JSON.stringify([
            "http://habrahabr.ru/*", 
            "http://geektimes.ru/*", 
            "http://megamozg.ru/*",
            "https://habrahabr.ru/*", 
            "https://geektimes.ru/*", 
            "https://megamozg.ru/*"
        ]),

        homepage: "https://github.com/damirm/tm-reading-time.git",
        author: "Makhmutov Damir",

        license: "MIT",

        apiUrl: "https://noble-linker-95212.appspot.com"
    }
};

module.exports = config;
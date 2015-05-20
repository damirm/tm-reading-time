var data = require('sdk/self').data,
    pageMod = require('sdk/page-mod');

ageMod.PageMod({
    include: [
        "*://habrahabr.ru/post/*",
        "*://habrahabr.ru/company/*/blog/*",
        "*://geektimes.ru/post/*",
        "*://geektimes.ru/company/*/blog/*",
        "*://megamozg.ru/post/*",
        "*://megamozg.ru/company/*/blog/*"
    ],

    contentScriptFile: [
        data.url("js/contenscript.js")
    ],

    contentScriptWhen: 'start'
});
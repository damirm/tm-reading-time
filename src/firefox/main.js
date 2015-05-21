var data = require('sdk/self').data,
    pageMod = require('sdk/page-mod');

ageMod.PageMod({
    include: /* @echo plugin.domains */,

    contentScriptFile: [
        data.url("js/contenscript.js")
    ],

    contentScriptWhen: 'start'
});
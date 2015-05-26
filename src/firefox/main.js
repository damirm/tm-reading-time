var data = require('sdk/self').data,
    pageMod = require('sdk/page-mod');

pageMod.PageMod({
    include: /* @echo plugin.domainsFirefox */,
    contentScriptFile: data.url("js/contentscript.js")
});
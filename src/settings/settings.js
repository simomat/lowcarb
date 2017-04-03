
const webext = require('../webExtApi').webext;
const SelectorList = require('./selectorlist').SelectorList;
const WhiteListModel = require('./whitelistmodel').WhiteListModel;

let selectorList = new SelectorList(
        document.getElementById('whitelist'),
        new WhiteListModel());


function removeCookies() {
    selectorList.save();
    webext.sendMessage({"command": "removeCookies"}).catch((reason) => {
        console.log('sending message was rejected: ' + reason);
    });
    // TODO: reload nach löschen
}

window.addEventListener('unload', (event) => {
    selectorList.save();
});


function logCookies() {
    console.log('# Cookiiiiis #');
    let Cookie = require('../cookie').Cookie;
    webext.getAllCookies().then((cookies) => {
        for (let cookieDef of cookies) {
            let cookie = new Cookie(cookieDef);
            console.log(`# Cookie: ${cookie.url} :: ${cookie.cookieDef.name} :: ${cookie.cookieDef.value}`);
        }
    })
}

document.getElementById('removeCookies').addEventListener('click', removeCookies);
document.getElementById('logCookies').addEventListener('click', logCookies);


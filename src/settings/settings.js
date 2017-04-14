import {webext} from '../webExtApi';
import {Cookie} from '../cookie';
import {SelectorList} from './selectorlist';
import {WhiteListModel} from './whitelistmodel';
import {WhitelistDomainRepository} from './domainrepo.js';

let selectorList = new SelectorList(
    document.getElementById('whitelist'),
    new WhiteListModel(webext, new WhitelistDomainRepository()));


function sendCommandRemoveCookies() {
    return webext.sendMessage({"command": "removeCookies"});
}

function removeCookies() {
    selectorList.save()
        .then(sendCommandRemoveCookies)
        .catch(reason => console.log('save&send was rejected: ' + reason));
}

function handleMessage(message, sender, sendResponse) {
    if (message.event === 'cookiesRemoved') {
        console.log('reload after cookiesRemoved()');
        return selectorList.reload();
    }

    throw 'unknown message';
}

webext.addMessageListener(handleMessage);

window.addEventListener('unload', event => {
    webext.removeMessageListener(handleMessage);
    selectorList.save()
        .catch(console.log);
});


function logCookies() {
    console.log('# Cookiiiiis #');
    webext.getAllCookies().then(cookies => {
        for (let cookieDef of cookies) {
            let cookie = new Cookie(cookieDef);
            console.log(`# Cookie: ${cookie.url} :: ${cookie.cookieDef.name} :: ${cookie.cookieDef.value}`);
        }
    })
}

document.getElementById('removeCookies').addEventListener('click', removeCookies);
document.getElementById('logCookies').addEventListener('click', logCookies);


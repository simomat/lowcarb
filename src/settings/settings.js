console.log('####### SETTINGS');

const webext = require('../webExtApi').webext;


function removeCookies() {
    webext.sendMessage({"command": "removeCookies"}).catch((reason) => {
        console.log('sending message was rejected: ' + reason);
    });
}

function addWhitelistDomain() {

}

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
document.getElementById('addWhitelistDomain').addEventListener('click', addWhitelistDomain);

document.getElementById('logCookies').addEventListener('click', logCookies);

function reload() {
    webext.getStorage('whitelistDomains').then((storage) => {
        let wlDomains = document.getElementById('whitelist');
        for (let domain of storage.whitelistDomains) {
            let li = document.createElement('li');
            li.innerHTML = domain;
            wlDomains.appendChild(li);
        }
    });
}

reload();

"use strict";

function removeCookies() {
    browser.runtime.sendMessage({"command": "removeCookies"}).catch((reason) => {
        console.log('sending message was rejected: ' + reason);
    });
}

function addWhitelistDomain() {

}

document.getElementById('removeCookies').addEventListener('click', removeCookies);
document.getElementById('addWhitelistDomain').addEventListener('click', addWhitelistDomain);

function reload() {
    browser.storage.local.get('whitelistDomains').then((storage) => {
        let wlDomains = document.getElementById('whitelist');
        for (let domain of storage.whitelistDomains) {
            let li = document.createElement('li');
            li.innerHTML = domain;
            wlDomains.appendChild(li);
        }
    });
}

reload();

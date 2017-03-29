
const webext = require('../webExtApi').webext;
const SelectorList = require('./selectorlist').SelectorList;


class WhilteListModel {

    getItems() {
        return webext.getStorage('whitelistDomains')
            .then((storage) => {
                return webext.getAllCookies()
                    .then((cookies) => {
                        return new Promise((resolve, reject) => {
                            function* iterItems() {
                                for (let domain of storage.whitelistDomains) {
                                    yield {value: domain, isApplied: true};
                                }
                                for (let cookie of cookies) {
                                    yield {value: cookie.domain, isApplied: false};
                                }

                            }
                            resolve(iterItems());
                        });
                    })

            });
    }
}

new SelectorList(document.getElementById('whitelist'), new WhilteListModel())
    .reload();


function removeCookies() {
    webext.sendMessage({"command": "removeCookies"}).catch((reason) => {
        console.log('sending message was rejected: ' + reason);
    });
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
document.getElementById('logCookies').addEventListener('click', logCookies);


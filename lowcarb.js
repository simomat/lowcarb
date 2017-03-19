"use strict";

function getUrlFromCookie(cookie) {
    if ('url' in cookie) {
        return cookie.url;
    }

    let url = 'http://';
    if (cookie.secure) {
        url = 'https://'
    }
    if (cookie.domain.startsWith('.')) {
        url += cookie.domain.substr(1);
    } else {
        url += cookie.domain;
    }
    url += cookie.path;
    return url;
}

function toRemoveParameter(cookie)  {
    return {
        "url": getUrlFromCookie(cookie),
        "storeId": cookie.storeId,
        "name": cookie.name
    };
}

function removeCookie(cookie) {
    let removeParam = toRemoveParameter(cookie)
    console.log('remove cookie: ' + JSON.stringify(removeParam));
    let removed = browser.cookies.remove(removeParam);
    if (removed === null) {
        console.log('couldnt remove: ' + removed.domain);
    }
}

function removeCookies(cookies) {
    for (let cookie of cookies) {
        try {
            removeCookie(cookie);
        } catch (e) {
            console.log("error on removing cookie from '" + cookie.domain + "': " + e);
        }
    }
}

browser.browserAction.onClicked.addListener((tab) => {
    browser.cookies
        .getAll({})
        .then(removeCookies)
});


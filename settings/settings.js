"use strict";

function removeCookies() {
    browser.runtime.sendMessage({"command": "removeCookies"}).catch((reason) => {
        console.log('sending message was rejected: ' + reason);
    });
}

var removeCookiesBtn = document.querySelector('.removeCookies');
removeCookiesBtn.addEventListener('click', removeCookies);

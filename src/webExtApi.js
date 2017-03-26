const webext = {};
webext.cookies = browser.cookies;
webext.sendMessage = browser.runtime.sendMessage;

exports.webext = webext;

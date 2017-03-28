const webext = {};
webext.removeCookie = browser.cookies.remove;
webext.getAllCookies = browser.cookies.getAll;

webext.sendMessage = browser.runtime.sendMessage;
webext.addMessageListener = browser.runtime.onMessage.addListener;

webext.clearStorage = browser.storage.local.clear;
webext.setStorage = browser.storage.local.set;
webext.getStorage = browser.storage.local.get;

exports.webext = webext;

export const webext = {
    removeCookie: browser.cookies.remove,
    getAllCookies: () => { return browser.cookies.getAll({}); },
    sendMessage: browser.runtime.sendMessage,
    addMessageListener: browser.runtime.onMessage.addListener,

    clearStorage: browser.storage.local.clear,
    setStorage: browser.storage.local.set,
    getStorage: browser.storage.local.get
};

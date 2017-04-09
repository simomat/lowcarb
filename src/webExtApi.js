export const webext = {
    removeCookie: function() {
        return browser.cookies.remove(...arguments);},
    getAllCookies: () => { return browser.cookies.getAll({}); },
    sendMessage: browser.runtime.sendMessage,
    addMessageListener: browser.runtime.onMessage.addListener,
    removeMessageListener: browser.runtime.onMessage.removeListener,

    clearStorage: browser.storage.local.clear,
    setStorage: browser.storage.local.set,
    getStorage: browser.storage.local.get
};

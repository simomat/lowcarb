export const webext = {
    removeCookie: function() {
        return browser.cookies.remove(...arguments);},
    getAllCookies: () => browser.cookies.getAll({}),
    sendMessage: browser.runtime.sendMessage,
    addMessageListener: browser.runtime.onMessage.addListener,
    removeMessageListener: browser.runtime.onMessage.removeListener,

    clearStorage: browser.storage.local.clear,
    setStorage: object => browser.storage.local.set(object),
    getStorage: key => browser.storage.local.get(key)
};

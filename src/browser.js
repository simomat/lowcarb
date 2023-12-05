export const getWhitelistDomains = async () => (await browser.storage.sync.get({ whitelistDomains: [] })).whitelistDomains
export const setWhitelistDomains = whitelistDomains => browser.storage.sync.set({ whitelistDomains })
export const getCookies = () => browser.cookies.getAll({})

export const saveSettings = async settings => browser.storage.sync.set({ settings })
export const getSettings = async () => {
  const storage = await browser.storage.sync.get('settings')
  return storage.settings ?? {
    ...{
      removeOnStartup: true,
      notifyCookiesRemoved: false
    }
  }
}

export function openOptionsPageOnbrowserAction () {
  browser.browserAction.onClicked.addListener(() => browser.runtime.openOptionsPage())
}

export const createNotification = (id, param) => browser.notifications.create(id, param)
export const clearNotification = id => browser.notifications.clear(id)
export const createAlarm = browser.alarms.create
export const onAlarm = browser.alarms.onAlarm.addListener
export const translate = browser.i18n.getMessage

export const normalizeDomain = domain => {
  domain = domain.toLowerCase()
  if (domain.startsWith('.')) {
    return domain.substr(1)
  }
  return domain
}

export const toDomainMatchers = domain => new RegExp(`^\\.?${domain.replace('\\.', '\\\\.')}$`, 'i')

export const toRemoveParameter = cookie => ({
  url: urlOfCookie(cookie),
  storeId: cookie.storeId,
  name: cookie.name
})

export const urlOfCookie = cookie => {
  if (cookie.url) {
    return cookie.url
  }
  return (cookie.secure ? 'https://' : 'http://') + normalizeDomain(cookie.domain) + cookie.path
}

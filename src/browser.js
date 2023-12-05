export const getWhitelistDomains = async () => (await browser.storage.sync.get({ whitelistDomains: [] })).whitelistDomains
export const setWhitelistDomains = whitelistDomains => browser.storage.sync.set({ whitelistDomains })
export const getCookies = () => browser.cookies.getAll({})

export const getSettings = async () => {
  const storage = await browser.storage.sync.get('settings')
  return storage.settings ?? {
    ...{
      removeOnStartup: true,
      notifyCookiesRemoved: false
    }
  }
}

export const saveSettings = async settings => browser.storage.sync.set({ settings })

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

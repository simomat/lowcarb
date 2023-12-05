import {
  getWhitelistDomains,
  setWhitelistDomains,
  getCookies,
  getSettings,
  toDomainMatchers,
  toRemoveParameter,
  createNotification,
  translate,
  createAlarm,
  onAlarm,
  clearNotification
} from './browser.js'

export async function toggleDomainApplied (domain) {
  const whitelistDomains = new Set(await getWhitelistDomains())
  if (domain.isApplied) {
    whitelistDomains.add(domain.name)
  } else {
    whitelistDomains.delete(domain.name)
  }
  setWhitelistDomains([...whitelistDomains])
}

export async function removeCookies () {
  const whitelistDomains = [...new Set(await getWhitelistDomains())]
  if (whitelistDomains.length === 0) {
    return
  }

  const cookies = await getCookies()
  if (cookies.lengt === 0) {
    return
  }

  const domainMatchers = whitelistDomains.map(toDomainMatchers)
  const deletedCookiesCount = cookies
    .filter(c => !domainMatchers.some(matcher => matcher.test(c.domain)))
    .map(toRemoveParameter)
    .map(async cookie => await browser.cookies.remove(cookie))
    .filter(prom => prom !== null)

  notifyCookiesRemoved(deletedCookiesCount.length)
}

async function notifyCookiesRemoved (count) {
  const settings = await getSettings()
  if (!settings.notifyCookiesRemoved) {
    return
  }
  const NOTIFICATION_COOKIES_REMOVED = 'lowcarb-cookies-removed'
  const ALARM_NOTIFICATION_EXPIRED = 'cookies-removed-notification-expired'
  createNotification(
    NOTIFICATION_COOKIES_REMOVED,
    {
      type: 'basic',
      title: 'Firefox Cookies ' + translate('removed'),
      message: translate('removedXCookies', count)
    })
  createAlarm(ALARM_NOTIFICATION_EXPIRED, { delayInMinutes: 0.5 })
  onAlarm(alarm => {
    if (alarm.name === ALARM_NOTIFICATION_EXPIRED) {
      clearNotification(NOTIFICATION_COOKIES_REMOVED)
    }
  })
}

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
  const cookies = await getCookies()
  if (cookies.lengt === 0) {
    return
  }

  const whitelistDomains = [...new Set(await getWhitelistDomains())]
  const domainMatchers = whitelistDomains.map(toDomainMatchers)
  
  const cookieRemoveParams = cookies
    .filter(c => !domainMatchers.some(matcher => matcher.test(c.domain)))
    .map(toRemoveParameter)
  
  logRemoveParams(cookieRemoveParams)
  
  const deletes = await Promise.all(cookieRemoveParams
    .map(async cookieParam => {
      try {
        if (await browser.cookies.remove(cookieParam) !== null) {
          return 1
        } 
        console.warn(`cookie to remove not found for ${cookieParam.url}`)
      } catch (error) {
        console.error(`could not remove cookie ${JSON.stringify(cookieParam)}: ${error}`)
      }
      return 0
    }))

  notifyCookiesRemoved(deletes.reduce((sum, current) => sum + current, 0))
}

async function notifyCookiesRemoved (count) {
  if (!count) {
    return
  }

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

const logRemoveParams = cookieRemoveParams =>
  Object.entries(Object.groupBy(cookieRemoveParams, param => param.url))
    .forEach(([url, byUrl]) => 
      Object.entries(Object.groupBy(byUrl, p => p.storeId))
        .forEach(([storeId, byUrlAndStore]) => 
          console.info(`removing cookies for ${url} in store ${storeId}, count: ${byUrlAndStore.length}`)))

import { getWhitelistDomains, setWhitelistDomains, getCookies, toDomainMatchers, toRemoveParameter } from '../browser.js'

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
    .map(async cookie => {
      await browser.cookies.remove(cookie)
    })
    .filter(prom => prom !== null)

  // TODO: notify
  console.log(`removec ${deletedCookiesCount} cookies`)
}

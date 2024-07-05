import { getWhitelistDomains, getCookies } from '../browser.js'

export async function buildDomainModel () {
  const cookieDomains = await getCookieDomains()
  const whitelistDomains = (await getWhitelistModel())

  const modelMap = [
    ...cookieDomains,
    ...whitelistDomains
  ].reduce((map, domain) => map.set(domain.name, domain), new Map())

  const model = [...modelMap.values()]
  return model
}

async function getWhitelistModel () {
  const whitelistDomains = await getWhitelistDomains()
  return [...new Set(whitelistDomains)].map(d => ({ name: d, isApplied: true }))
}

async function getCookieDomains () {
  const cookies = await getCookies()
  return cookies.map(c => ({ name: normalizeDomain(c.domain), isApplied: false }))
}

function normalizeDomain (domain) {
  domain = domain.toLowerCase()
  if (domain.startsWith('.')) {
    return domain.substr(1)
  }
  return domain
}

import { domainCompare } from './domaincompare.js'

export async function buildDomainModel () {
  const cookieDomains = await getCookieDomains()
  const whitelistDomains = await getWhitelistDomains()

  const modelMap = [
    ...cookieDomains,
    ...whitelistDomains
  ].reduce((map, domain) => map.set(domain.name, domain), new Map())

  const model = [...modelMap.values()]
  model.sort((a, b) => domainCompare(a.name, b.name))
  return model
}

async function getWhitelistDomains () {
  const storage = await browser.storage.sync.get({ whitelistDomains: [] })
  if (!storage || !storage.whitelistDomains) {
    return []
  }
  return [...new Set(storage.whitelistDomains)].map(d => ({ name: d, isApplied: true }))
}

async function getCookieDomains () {
  const cookies = await browser.cookies.getAll({})
  return cookies.map(c => ({ name: normalizeDomain(c.domain), isApplied: false }))
}

function normalizeDomain (domain) {
  domain = domain.toLowerCase()
  if (domain.startsWith('.')) {
    return domain.substr(1)
  }
  return domain
}

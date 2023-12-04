export async function toggleDomainApplied (domain) {
  const storage = await browser.storage.sync.get({ whitelistDomains: [] })
  const whitelistDomains = new Set(storage.whitelistDomains)
  if (domain.isApplied) {
    whitelistDomains.add(domain.name)
  } else {
    whitelistDomains.delete(domain.name)
  }
  browser.storage.sync.set({ whitelistDomains: [...whitelistDomains] })
}

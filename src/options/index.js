class DomainElement extends HTMLDivElement {
  constructor (domain) {
    super()
    this.domain = domain
    this.textContent = domain.name
  }
}

window.customElements.define('domain-element', DomainElement, { extends: 'div' })

function updateDomainData (domains) {
  const domainsContainer = document.getElementById('domains-container')

  if (domains.length === 0) {
    Array.from(domainsContainer.children).forEach(n => domainsContainer.removeChild(n))
    return
  }

  Array.from(domainsContainer.children).forEach(domainElement => {
    if (!domains.some(d => d.name === domainElement.domain.name)) {
      domainsContainer.removeChild(domainElement)
    }
  })

  if (domainsContainer.children.length === 0) {
    domains.forEach(domain => domainsContainer.appendChild(new DomainElement(domain)))
    return
  }

  let domainIndex = 0
  for (const domainElement of Array.from(domainsContainer.children)) {
    while (domainIndex < domains.length && domainElement.domain.name !== domains[domainIndex].name) {
      domainsContainer.insertBefore(new DomainElement(domains[domainIndex++]), domainElement)
    }

    if (domainElement.domain.name === domains[domainIndex].name) {
      domainIndex++
    }
  }
  while (domainIndex < domains.length) {
    domainsContainer.appendChild(new DomainElement(domains[domainIndex++]))
  }
}

updateDomainData([
  { name: ' qwer.asdf.yxcv.com' },
  { name: ' rtzu.fghj.vbnm.net' }
])

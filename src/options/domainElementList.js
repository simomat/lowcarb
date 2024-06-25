import { DomainElement } from './domainElement.js'

export class DomainElementList extends HTMLDivElement {
  constructor () {
    super()
  }

  updateDomainElements (domains) {
    if (domains.length === 0) {
      this.children.forEach(domainElement => domainElement.remove())
      return
    }

    Array.from(this.children).forEach(domainElement => {
      if (!domains.some(d => d.name === domainElement.domain.name)) {
        domainElement.remove()
      }
    })

    if (this.children.length === 0) {
      domains.forEach(domain => this.appendChild(new DomainElement(domain)))
      return
    }


    let domainIndex = 0
    for (const domainElement of Array.from(this.children)) {
      while (domainIndex < domains.length && domainElement.domain.name !== domains[domainIndex].name) {
        this.insertBefore(new DomainElement(domains[domainIndex++]), domainElement)
      }
  
      if (domainElement.domain.name === domains[domainIndex].name) {
        domainIndex++
      }
    }

    while (domainIndex < domains.length) {
      this.appendChild(new DomainElement(domains[domainIndex++]))
    }

  }

}

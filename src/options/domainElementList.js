import { DomainElement } from './domainElement.js'
import { domainCompare } from './domaincompare.js'

const elementSorterDomainAsc = (itemA, itemB) => domainCompare(itemA.domain.name, itemB.domain.name)
const elementSorterSelectedAsc = (itemA, itemB) => itemA.domain.isApplied ? (itemB.domain.isApplied ? 0 : 1) : (itemB.domain.isApplied ? -1 : 0);

export class DomainElementList extends HTMLDivElement {
  constructor () {
    super()
    
    const header = document.createElement('div');
    header.classList.add('lc-table-header')
    
    const headSelect = document.createElement('div');
    headSelect.classList.add('lc-header-select')
    headSelect.addEventListener('click', () => this.updateSorting('selected'))
    header.appendChild(headSelect)

    header.appendChild(document.createTextNode('〡'))

    const headDomain = document.createElement('div');
    headDomain.classList.add('lc-header-domain')
    headDomain.classList.add('lc-sort-asc')
    headDomain.addEventListener('click', () => this.updateSorting('domain'))
    header.appendChild(headDomain)

    const expander = document.createElement('div');
    expander.setAttribute('style', 'margin-left: auto; margin-right: 0;')
    headDomain.appendChild(expander)

    this.appendChild(header)

    const list = document.createElement('div');
    list.setAttribute('id', 'domains-container')
    list.classList.add('lc-table')
    this.appendChild(list)
  }

  updateSorting (sortBy) {
    let headSelect = this.getElementsByClassName('lc-header-select')[0]
    let headDomain = this.getElementsByClassName('lc-header-domain')[0]

    if (sortBy === 'selected') {
      headDomain.classList.remove('lc-sort-desc', 'lc-sort-asc')

      if (!headSelect.classList.replace('lc-sort-asc', 'lc-sort-desc' )) {
        headSelect.classList.remove('lc-sort-desc')
        headSelect.classList.add('lc-sort-asc')
      }

    } else if (sortBy === 'domain') {
      headSelect.classList.remove('lc-sort-desc', 'lc-sort-asc')

      if (!headDomain.classList.replace('lc-sort-asc', 'lc-sort-desc' )) {
        headDomain.classList.remove('lc-sort-desc')
        headDomain.classList.add('lc-sort-asc')
      }

    } else {
      console.error(`unknown sort property: ${sortBy}`)
      return
    }

    this.sortElements()
  }

  sortElements () {
    const list = this.getElementsByClassName('lc-table')[0]
    Array.from(list.children)
      .sort(this.getSorter())
      .forEach(elem => list.appendChild(elem))
  }

  getSorter () {
    const headDomain = this.getElementsByClassName('lc-header-domain')[0]
    if (headDomain.classList.contains('lc-sort-desc')) {
      return (domainItemA, domainItemB) => elementSorterDomainAsc(domainItemA, domainItemB) * -1
    }

    const headSelect = this.getElementsByClassName('lc-header-select')[0]
    if (headSelect.classList.contains('lc-sort-asc')) {
      return elementSorterSelectedAsc
    } 
    
    if (headSelect.classList.contains('lc-sort-desc')) {
      return (domainItemA, domainItemB) => elementSorterSelectedAsc(domainItemA, domainItemB) * -1
    }

    return elementSorterDomainAsc
  }

  updateDomainElements (domains) {
    const list = this.getElementsByClassName('lc-table')[0]

    while (list.lastElementChild) {
      list.removeChild(list.lastElementChild);
    }
    
    domains.forEach(domain => list.appendChild(new DomainElement(domain)))

    this.sortElements()
  }
}

import { toggleDomainApplied } from '../actions.js'

export class DomainElement extends HTMLDivElement {
  constructor (domain) {
    super()
    this.domain = domain
    this.textContent = domain.name
    this.classList.add('lc-list-item')
    this.setActiveClass()

    this.addEventListener('click', () => {
      this.domain.isApplied = !this.domain.isApplied
      toggleDomainApplied(this.domain)
      this.setActiveClass()
    })
  }

  setActiveClass () {
    const clazz = 'lc-selected'
    if (this.domain.isApplied) {
      this.classList.add(clazz)
    } else {
      this.classList.remove(clazz)
    }
  }
}

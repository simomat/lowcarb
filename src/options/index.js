import { buildDomainModel } from './domainModel.js'
import { DomainElement, updateDomainElements } from './domainElement.js'

window.customElements.define('domain-element', DomainElement, { extends: 'div' })

async function update () {
  const domainModel = await buildDomainModel()
  updateDomainElements(domainModel)
}
update()

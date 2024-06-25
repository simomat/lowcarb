import { buildDomainModel } from './domainModel.js'
import { DomainElement } from './domainElement.js'
import { DomainElementList } from './domainElementList.js'
import { removeCookies } from '../actions.js'
import { getSettings, saveSettings } from '../browser.js'

window.customElements.define('domain-element', DomainElement, { extends: 'div' })
window.customElements.define('domain-element-list', DomainElementList, { extends: 'div' })

async function updateListModel () {
  document.getElementById('domains-container').updateDomainElements(await buildDomainModel())
}

async function bindControls () {
  document.getElementById('btn-removeCookies').addEventListener('click', async () => {
    await removeCookies()
    updateListModel()
  })

  document.getElementById('btn-refresh').addEventListener('click', updateListModel)

  const settings = await getSettings()

  const toggleClickHandler = handler => event => {
    const newState = event.target.getAttribute('aria-pressed') !== 'true'
    event.target.setAttribute('aria-pressed', newState)
    handler(newState)
  }

  const removeOnStartup = document.getElementById('btn-removeOnStartup')
  removeOnStartup.addEventListener('click', toggleClickHandler(async newVal => {
    const settings = await getSettings()
    settings.removeOnStartup = newVal
    saveSettings(settings)
  }))
  removeOnStartup.setAttribute('aria-pressed', settings.removeOnStartup)

  const notify = document.getElementById('btn-notify')
  notify.addEventListener('click', toggleClickHandler(async newVal => {
    const settings = await getSettings()
    settings.notifyCookiesRemoved = newVal
    saveSettings(settings)
  }))
  notify.setAttribute('aria-pressed', settings.notifyCookiesRemoved)
}

bindControls()
updateListModel()

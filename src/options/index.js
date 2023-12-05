import { buildDomainModel } from './domainModel.js'
import { DomainElement, updateDomainElements } from './domainElement.js'
import { removeCookies } from './actions.js'
import { getSettings, saveSettings } from '../browser.js'

window.customElements.define('domain-element', DomainElement, { extends: 'div' })

async function updateListModel () {
  updateDomainElements((await buildDomainModel()))
}

function bindButtons () {
  document.getElementById('btn-removeCookies').addEventListener('click', async () => {
    await removeCookies()
    updateListModel()
  })

  document.getElementById('btn-refresh').addEventListener('click', updateListModel)
}

async function bindCheckboxes () {
  const settings = await getSettings()

  const removeOnStartup = document.getElementById('s-removeOnStartup')
  removeOnStartup.addEventListener('click', async () => {
    const settings = await getSettings()
    settings.removeOnStartup = removeOnStartup.checked
    saveSettings(settings)
  })
  removeOnStartup.checked = settings.removeOnStartup

  const notify = document.getElementById('s-notify')
  notify.addEventListener('click', async () => {
    const settings = await getSettings()
    settings.notifyCookiesRemoved = notify.checked
    saveSettings(settings)
  })
  notify.checked = settings.notifyCookiesRemoved
}

bindButtons()
bindCheckboxes()
updateListModel()

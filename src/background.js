import { openOptionsPageOnbrowserAction, getSettings } from './browser.js'
import { removeCookies } from './actions.js'

async function startUp () {
  openOptionsPageOnbrowserAction()
  const settings = await getSettings()
  if (settings.removeOnStartup) {
    removeCookies()
  }
}

startUp()

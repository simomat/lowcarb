import { openOptionsPageOnBrowserAction, getSettings } from './browser.js'
import { removeCookies } from './actions.js'

async function startUp () {
  openOptionsPageOnBrowserAction()
  const settings = await getSettings()
  if (settings.removeOnStartup) {
    removeCookies()
  }
}

startUp()

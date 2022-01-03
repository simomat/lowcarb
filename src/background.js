import {removeCookies} from './removecookies';
import {onBrowserActionClicked, openOptionsPage} from './webext';
import { loadSettings } from './settings'

onBrowserActionClicked(openOptionsPage);

loadSettings().map(settings => {
    if (settings.removeOnStartup) {
        removeCookies();
    }
});

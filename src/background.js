import {removeCookies} from './removecookies';
import {onAlarm, clearNotification, onBrowserActionClicked, openOptionsPage} from './webext';
import { loadSettings } from './settings'

onBrowserActionClicked(openOptionsPage);

onAlarm(alarm => {
    if (alarm.name === 'cookies-removed-notification-expired') {
        return clearNotification('lowcarb-cookies-removed');
    }
})

loadSettings().map(settings => {
    if (settings.removeOnStartup) {
        removeCookies();
    }
});

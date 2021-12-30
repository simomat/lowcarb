import {removeCookies} from './removecookies';
import {onAlarm, clearNotification, onBrowserActionClicked, openOptionsPage} from './webext';
import { getEnv } from './utils';
import { loadSettings } from './settings'

onAlarm(alarm => {
    if (alarm.name === 'cookies-removed-notification-expired') {
        return clearNotification('lowcarb-cookies-removed');
    }
})

getEnv().map(env => {
    if (env.os !== 'android') {
        onBrowserActionClicked(openOptionsPage);
    }
});

loadSettings().map(settings => {
    if (settings.removeOnStartup) {
        removeCookies();
    }
});

import {createNotification, clearNotification, getIntMessage, createAlarm, onAlarm, getAlarm} from './webext';
import {loadSettings} from './settings';

export const NOTIFICATION_COOKIES_REMOVED = 'lowcarb-cookies-removed';
export const ALARM_NOTIFICATION_EXPIRED = 'cookies-removed-notification-expired';

const getCookieCount = cookies => cookies.filter(c => c !== null).length;

const delayedRemoveNotification = () => {
    createAlarm(ALARM_NOTIFICATION_EXPIRED, {delayInMinutes: 0.5})
    onAlarm(alarm =>  {
        if (alarm.name === ALARM_NOTIFICATION_EXPIRED) {
            clearNotification(NOTIFICATION_COOKIES_REMOVED)
        }
    })
};

const showNotification = cookiesCount => 
    createNotification(
        NOTIFICATION_COOKIES_REMOVED,
        {
            type: 'basic',
            title: 'Firefox Cookies ' + getIntMessage('removed'),
            message: getIntMessage('removedXCookies', cookiesCount)
        });

export const notifyCookiesRemoved = async cookies => {
    const cookiesCount = getCookieCount(cookies)
    if (cookiesCount === 0) {
        return true;
    }

    loadSettings()
    .map(settings => {
        if (settings.notifyCookiesRemoved) {
            showNotification(cookiesCount)
            delayedRemoveNotification();
        }
    });

    return true;
};

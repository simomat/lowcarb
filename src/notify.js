import {createNotification, clearNotification, getIntMessage, createAlarm, onAlarm} from './webext';
import {ifNotifyOnRemovedCookies} from './settings';

export const NOTIFICATION_COOKIES_REMOVED = 'lowcarb-cookies-removed';
export const ALARM_NOTIFICATION_EXPIRED = 'cookies-removed-notification-expired';

const setRemoveNotificationAlarm = () => onAlarm(alarm =>  alarm.name === ALARM_NOTIFICATION_EXPIRED ? clearNotification(NOTIFICATION_COOKIES_REMOVED) : undefined);

export const notifyCookiesRemoved = async cookies => {
    cookies = cookies.filter(c => c !== null);
    if (cookies.length === 0) {
        return true;
    }

    if (! await browser.alarms.get(ALARM_NOTIFICATION_EXPIRED)) {
        setRemoveNotificationAlarm();
    }
    

    ifNotifyOnRemovedCookies()
        .map(() => createNotification(
            NOTIFICATION_COOKIES_REMOVED,
            {
                type: 'basic',
                title: 'Firefox Cookies ' + getIntMessage('removed'),
                message: getIntMessage('removedXCookies', cookies.length)
            }))
        .map(() => createAlarm(ALARM_NOTIFICATION_EXPIRED, {delayInMinutes: 0.5}));

    return true;
};

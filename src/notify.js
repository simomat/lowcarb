import {clearNotification, createNotification, onAlarm, createAlarm, getIntMessage} from './webext';
import {ifNotifyOnRemovedCookies} from './settings';

onAlarm(alarm => {
    if (alarm.name === 'cookies-removed-notification-expired') {
        clearNotification('lowcarb-cookies-removed');
    }
});

export const notifyCookiesRemoved = cookies => {
    cookies = cookies.filter(c => c !== null);
    if (cookies.length === 0) {
        return true;
    }

    ifNotifyOnRemovedCookies()
        .map(() => createNotification(
            'lowcarb-cookies-removed',
            {
                type: 'basic',
                title: 'Firefox Cookies ' + getIntMessage('removed'),
                message: getIntMessage('removedXCookies', cookies.length)
            }))
        .map(() => createAlarm('cookies-removed-notification-expired', {delayInMinutes: 0.5}));

    return true;
};


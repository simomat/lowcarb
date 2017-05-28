import {createAlarm, onAlarm} from './webext';

export const onAlarmClearRemoveNotification = handler => onAlarm(alarm => {
    if (alarm.name === 'cookies-removed-notification-expired') {
        return handler();
    }
});

export const createAlarmRemoveNotification = delayInMinutes => createAlarm('cookies-removed-notification-expired', {delayInMinutes});
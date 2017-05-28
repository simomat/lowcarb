import {refreshListView, saveListModel} from './presenter';
import {sendCommand} from '../commandlistener';
import {setNotifyCookiesRemoved, setRemoveCookiesOnStartup} from '../settings';
import {getElement} from '../utils';

export const onRemoveCookies = () =>
    saveListModel()
        .map(() => sendCommand('removeCookies'))
        .map(refreshListView);

export const onReload = () => saveListModel().map(refreshListView);
export const onChangeRemoveOnStartup = () => setRemoveCookiesOnStartup(getElement('removeOnStartup').checked);
export const onChangeNotifyCookiesRemoved = () => setNotifyCookiesRemoved(getElement('notifyCookiesRemoved').checked);
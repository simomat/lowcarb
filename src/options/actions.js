import {refreshListView, saveListModel} from './presenter';
import {sendMessage} from '../webext';
import {setRemoveCookiesOnStartup} from '../settings';
import {getElement} from '../utils';

export const onRemoveCookies = () =>
    saveListModel()
        .map(() => sendMessage({command: 'removeCookies'}))
        .map(refreshListView);

export const onReload = () =>
    saveListModel()
        .map(refreshListView);

export const onChangeRemoveOnStartup = () =>
    setRemoveCookiesOnStartup(getElement('removeOnStartup').checked);
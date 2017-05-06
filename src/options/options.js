import {sendMessage} from '../webext';
import {ifRemoveCookiesOnStartup, setRemoveCookiesOnStartup} from '../settings';
import {refreshListView, saveListModel} from './presenter';
import {translateContent} from '../i18n';

translateContent();

window.addEventListener('unload', saveListModel);

const getElement = id => document.getElementById(id);

getElement('removeCookies').addEventListener('click', () =>
    saveListModel()
        .map(() => sendMessage({command: 'removeCookies'}))
        .map(refreshListView));

getElement('reload').addEventListener('click', () =>
    saveListModel()
        .map(refreshListView));

ifRemoveCookiesOnStartup().map(() =>
    document.getElementById('removeOnStartup').checked = true);

getElement('removeOnStartup').addEventListener('change', () =>
    setRemoveCookiesOnStartup(getElement('removeOnStartup').checked));

refreshListView();
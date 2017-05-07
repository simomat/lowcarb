import {ifRemoveCookiesOnStartup} from '../settings';
import {refreshListView, saveListModel} from './presenter';
import {translateContent} from '../i18n';
import {getElement} from '../utils';
import {onChangeRemoveOnStartup, onReload, onRemoveCookies} from './actions';

const addElementEventListener = (elementId, eventName, listener) =>
    getElement(elementId).addEventListener(eventName, listener);

translateContent();

ifRemoveCookiesOnStartup()
    .map(() => getElement('removeOnStartup').checked = true);

addElementEventListener('removeCookies', 'click', onRemoveCookies);
addElementEventListener('reload', 'click', onReload);
addElementEventListener('removeOnStartup', 'change', onChangeRemoveOnStartup);

refreshListView();

window.addEventListener('unload', saveListModel);
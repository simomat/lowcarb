import {ifNotifyOnRemovedCookies, ifRemoveCookiesOnStartup} from '../settings';
import {refreshListView, saveListModel} from './presenter';
import {translateContent} from './i18n';
import {getElement, ifIsAndroid} from '../utils';
import {onChangeNotifyCookiesRemoved, onChangeRemoveOnStartup, onReload, onRemoveCookies} from './actions';

const addElementEventListener = (elementId, eventName, listener) =>
    getElement(elementId).addEventListener(eventName, listener);

translateContent();

ifRemoveCookiesOnStartup()
    .map(() => getElement('removeOnStartup').checked = true);

ifNotifyOnRemovedCookies()
    .map(() => getElement('notifyCookiesRemoved').checked = true);

addElementEventListener('removeCookies', 'click', onRemoveCookies);
addElementEventListener('reload', 'click', onReload);
addElementEventListener('removeOnStartup', 'change', onChangeRemoveOnStartup);
addElementEventListener('notifyCookiesRemoved', 'change', onChangeNotifyCookiesRemoved);

refreshListView();

window.addEventListener('unload', saveListModel);

ifIsAndroid().orElse(() => getElement('html').classList.add('non-touch'));
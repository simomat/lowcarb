import {maybeOf} from 'wellmaybe';
import {getElement, returnTrue} from '../utils';

const getRootElem = () => maybeOf(getElement('whitelist'));
const clearListItems = rootElem => {
    while (rootElem.firstChild) {
        rootElem.removeChild(rootElem.firstChild);
    }
    return rootElem;
};

const appendListItems = listItems => rootElem =>
    returnTrue(listItems.forEach(item => rootElem.appendChild(item)));

export const getListElements = () =>
    getRootElem()
        .map(elem => elem.children);

export const setListElements = listItems =>
    getRootElem()
        .map(clearListItems)
        .map(appendListItems(listItems));

export const onListItemClick = handler =>
    getRootElem()
        .map(rootElem => rootElem.addEventListener('click', event => handler(event.target)));
import {maybeOf} from 'wellmaybe';

const getRootElem = () => maybeOf(document.getElementById('whitelist'));
const clearListItems = rootElem => {
    while (rootElem.firstChild) {
        rootElem.removeChild(rootElem.firstChild);
    }
    return rootElem;
};

const appendListItems = listItems => rootElem => {
    for (let item of listItems) {
        rootElem.appendChild(item);
    }
    return true;
};

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
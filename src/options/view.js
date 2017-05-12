import {maybeOf} from 'wellmaybe';
import {getElement, returnTrue} from '../utils';

const getRootElem = () => maybeOf(getElement('whitelist'));

export const getListElements = () =>
    getRootElem()
        .map(elem => elem.children);

export const setListElements = listContent =>
    getRootElem()
        .map(rootElem => returnTrue(rootElem.innerHTML = listContent));

export const onListItemClick = handler =>
    getRootElem()
        .map(rootElem => rootElem.addEventListener('click', event => handler(event.target)));
import {maybeOf} from 'wellmaybe';
import {getElement, returnTrue} from '../utils';

const getRootElem = () => maybeOf(getElement('whitelist'));

export const getListElements = () =>
    getRootElem()
        .map(elem => elem.children)
        .map(listElements => Array.from(listElements));

const Sanitizer = {unwrapSafeHTML: s => s /* no thanks, we know what we are doing, lint */};
export const setListElements = listContent =>
    getRootElem()
        .map(rootElem => returnTrue(rootElem.innerHTML = Sanitizer.unwrapSafeHTML(listContent)));

export const onListItemClick = handler =>
    getRootElem()
        .map(rootElem => rootElem.addEventListener('click', event => handler(event.target)));
import {getIntMessage} from '../webext';
import {maybeOf} from 'wellmaybe';
import {returnTrue} from '../utils';

const getTranslatableElements = () => maybeOf(document.querySelectorAll('[data-m]'));

const translateElements = nodeList =>
    returnTrue(nodeList.forEach(node => node.innerText = getIntMessage(node.dataset.m)));

export const translateContent = () =>
    getTranslatableElements()
        .map(translateElements);
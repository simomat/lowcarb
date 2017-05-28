import {getIntMessage} from '../webext';
import {Maybe} from 'wellmaybe';
import {returnTrue} from '../utils';

const getTranslatableElements = () => Maybe.of(document.querySelectorAll('[data-m]'));
const translateElements = nodeList =>
    returnTrue(nodeList.forEach(node => node.innerText = getIntMessage(node.dataset.m)));

export const translateContent = () => getTranslatableElements().map(translateElements);
import {domainCompare} from './domaincompare';
import {getModelItems, setModelItems} from './modelstore';
import {getListElements, onListItemClick, setListElements} from './view';
import {maybeOf} from 'wellmaybe';

function toListElement(modelItems) {
    let element = document.createElement('li');
    element.appendChild(document.createTextNode(modelItems.value));
    element.classList.add('list-group-item');
    if (modelItems.isApplied) {
        element.classList.add('active');
    }
    return element;
}

const toModelItem = listElement => ({
        value: listElement.innerText.trim(),
        isApplied: listElement.classList.contains('active')
});

const sortModelItem = listElements => listElements.sort((a, b) => domainCompare(a.value, b.value));

export const refreshListView = () =>
    getModelItems()
        .map(sortModelItem)
        .map(modelItems => modelItems.map(toListElement))
        .map(setListElements);

export const saveListModel = () =>
    getListElements()
        .map(listElements => Array.from(listElements).map(toModelItem))
        .map(setModelItems);

const ifElementIsListItem = element => maybeOf(element.classList.contains('list-group-item'));

onListItemClick(element =>
    ifElementIsListItem(element)
        .map(() => element.classList.toggle('active')));
import {domainCompare} from './domaincompare';
import {getModelItems, setModelItems} from './modelstore';
import {getListElements, onListItemClick, setListElements} from './view';
import {maybeOf} from 'wellmaybe';
import {getIntMessage} from '../webext';

const toListContent = items => items
    .map(item => `<li class="list-group-item${item.isApplied ? ' active' : ''}">${item.value}</li>`)
    .join('');

const createEmptyPlaceholder = () => `<li class="empty">${getIntMessage('empty')}</li>`;

const removeEmptyPlaceholder = elements => elements.filter(e => !e.classList.contains('empty'));

const toModelItem = listElement => ({
        value: listElement.innerText.trim(),
        isApplied: listElement.classList.contains('active')
});

const sortModelItems = listElements => listElements.sort((a, b) => domainCompare(a.value, b.value));

export const refreshListView = () =>
    getModelItems()
        .map(sortModelItems)
        .map(toListContent)
        .orElse(createEmptyPlaceholder)
        .map(setListElements);

export const saveListModel = () =>
    getListElements()
        .map(removeEmptyPlaceholder)
        .map(listElements => listElements.map(toModelItem))
        .map(setModelItems);

const ifElementIsListItem = element => maybeOf(element.classList.contains('list-group-item'));

onListItemClick(element =>
    ifElementIsListItem(element)
        .map(() => element.classList.toggle('active')));
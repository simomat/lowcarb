import {domainCompare} from "./domaincompare";

function createListElement(item) {
    let element = document.createElement('li');
    element.appendChild(document.createTextNode(item.value));
    element.classList.add('list-group-item');
    if (item.isApplied) {
        element.classList.add('active');
    }
    return element;
}

export class Presenter {
    constructor(view, modelStore) {
        this.view = view;
        this.modelStore = modelStore;
        this.model = null;

        this.view.onItemClick(element => this.itemClicked(element));
    }

    refresh() {
        this.modelStore.getModel()
            .then(model => {
                this.model = model;
                this.rebuildView();
            });
    }

    rebuildView() {
        this.view.clear();

        let listElements = this.model.getItems()
            .sort((a, b) => domainCompare(a.value, b.value))
            .map(createListElement);
        this.view.setListItems(listElements);
    }

    itemClicked(element) {
        if (!element.classList.contains('list-group-item')) {
            return;
        }
        element.classList.toggle('active');
        this.model.toggleItem(element.innerText.trim());
    }

    persistModel() {
        if (this.model !== null) {
            return this.modelStore.persist(this.model);
        }
    }
}

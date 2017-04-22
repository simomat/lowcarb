import {domainCompare} from "./domaincompare";

function createListElement(item) {
    let element = document.createElement('div');
    element.appendChild(document.createTextNode(item.value));
    element.classList.add('listItem');
    if (item.isApplied) {
        element.classList.add('selected');
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
        if (!element.classList.contains('listItem')) {
            return;
        }
        element.classList.toggle('selected');
        this.model.toggleItem(element.innerText.trim());
    }

    persistModel() {
        if (this.model !== null) {
            return this.modelStore.persist(this.model);
        }
    }
}

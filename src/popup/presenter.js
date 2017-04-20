import {domainCompare} from "./domaincompare";

function createListElement(item) {
    let element = document.createElement('div');
    element.appendChild(document.createTextNode(item.value));
    element.classList.add('item');
    if (item.isApplied) {
        element.classList.add('selected');
    }
    return element;
}

export class Presenter {
    constructor(view, modelstore) {
        this.view = view;
        this.modelstore = modelstore;
        this.model = null;

        this.view.onItemClick(this.itemClicked)
    }

    refresh() {
        this.modelstore.getModel()
            .then(model => {
                this.model = model;
                this.rebuildView();
            });
    }

    rebuildView() {
        this.view.clear();

        let listElements = this.model.getItems()
            .sort((a, b) => domainCompare(a.domain, b.domain))
            .map(createListElement);
        this.view.setListItems(listElements);
    }

    itemClicked(element) {
        element.classList.toggle('selected');
        this.model.toggleItem(element.innerText.trim());
    }

    persistModel() {
        return this.modelstore.persist(this.model);
    }
}

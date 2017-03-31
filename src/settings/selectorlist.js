
class SelectorList {

    constructor(parentElem, model) {
        this.parentElem = parentElem;
        this.model = model;
        this.reload();
    }

    reload() {
        this.clear();
        this.model
            .getItems()
            .then((items) => {
                items = Array.from(items);
                for (let item of items) {
                    this.parentElem.appendChild(this.createListElement(item));
                }
        });
    }

    createListElement(item) {
        let element = document.createElement('div');
        element.appendChild(document.createTextNode(item.value));
        element.dataset.item = item;
        if (item.isApplied) {
            element.classList.add('itemSelected');
        }
        return element;
    }


    clear() {
        while (this.parentElem.firstChild) {
            this.parentElem.removeChild(this.parentElem.firstChild);
        }
    }
}

exports.SelectorList = SelectorList;

export class SelectorList {

    constructor(parentElem, model) {
        this.parentElem = parentElem;
        this.model = model;
        this.bindListener();
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
        element.classList.add('item');
        if (item.isApplied) {
            element.classList.add('selected');
        }
        return element;
    }


    clear() {
        while (this.parentElem.firstChild) {
            this.parentElem.removeChild(this.parentElem.firstChild);
        }
    }

    bindListener() {
        this.parentElem.addEventListener('click', (event) => {
            event.target.classList.toggle('selected');
        })
    }

    save() {
        let items = Array.from(this.parentElem.children)
            .map((elem) => {
                return {
                    value: elem.textContent.trim(),
                    isApplied: elem.classList.contains('selected')
                };
        });

        return this.model.saveItems(items);
    }
}


export class View {
    constructor(rootElem) {
        this.rootElem = rootElem;
    }

    clear() {
        while (this.rootElem.firstChild) {
            this.rootElem.removeChild(this.rootElem.firstChild);
        }
    }

    onItemClick(handler) {
        this.rootElem.addEventListener('click', event => handler(event.target));
    }

    setListItems(items) {
        for (let item of items) {
            this.rootElem.appendChild(item);
        }
    }

}
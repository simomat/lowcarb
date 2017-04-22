export class ListModel {
    constructor(items) {
        this.items = items;
    }

    getItems() {
        return this.items;
    }

    toggleItem(value) {
        let item = this.items.find(item => item.value === value);
        if (item !== undefined) {
            item.isApplied = !item.isApplied;
        }
    }
}
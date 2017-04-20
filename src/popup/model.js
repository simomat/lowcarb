
export class Model {
    constructor(items=[]) {
        this.items = items;
    }

    getItems() {
        return this.items;
    }

    toggleItem(value) {
        let item = this.items.find(item => item.value === value);
        if (item !== undefined) {
            item.isApplied = !item.isApplied;
        } else {
            console.log('toggleItem: could not find item with value ' + value);
        }
    }
}

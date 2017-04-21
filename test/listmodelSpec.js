import {assertThat, is, FeatureMatcher} from 'hamjest';
import {ListModel} from '../src/popup/listmodel';

function itemWithApplied(isApplied) {
    return new FeatureMatcher(isApplied, 'item with isApplied', 'isApplied');
}

describe("ListModel", function () {

    it("getItems returns model items", function () {
        let items = ['a', 'b', 'c'];
        let listModel = new ListModel(items);

        assertThat(listModel.getItems(), is(items));
    });

    it("toggleItem turns isApplied false to true", function () {
        let item = {value: 'abc', isApplied: false};
        let listModel = new ListModel([item]);

        listModel.toggleItem('abc');

        assertThat(item, is(itemWithApplied(true)));
    });

    it("toggleItem turns isApplied true to false", function () {
        let item = {value: 'abc', isApplied: true};
        let listModel = new ListModel([item]);

        listModel.toggleItem('abc');

        assertThat(item, is(itemWithApplied(false)));
    });

    it("toggleItem leaves unmatched as is", function () {
        let item = {value: 'abc', isApplied: true};
        let listModel = new ListModel([item]);

        listModel.toggleItem('doesnotexist');

        assertThat(item, is(itemWithApplied(true)));
    });
});

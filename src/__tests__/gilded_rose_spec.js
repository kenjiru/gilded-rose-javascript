import {Shop, Item} from '../gilded_rose';

const createFixtureShop = () => {
    const items = [];

    items.push(new Item('+5 Dexterity Vest', 10, 20));
    items.push(new Item('Aged Brie', 2, 0));
    items.push(new Item('Aged Brie', 2, 49));
    items.push(new Item('Elixir of the Mongoose', 5, 7));
    items.push(new Item('Sulfuras, Hand of Ragnaros', 0, 80));
    items.push(new Item('Sulfuras, Hand of Ragnaros', -1, 80));
    items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20));
    items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 10, 49));
    items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 10, 45));
    items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 5, 49));
    items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 5, 45));
    // this conjured item does not work properly yet
    items.push(new Item('Conjured Mana Cake', 3, 6));


    return new Shop(items);
};

const cloneDeep = function (data) {
    return JSON.parse(JSON.stringify(data));
};

describe("Gilded Rose", () => {
    it("works as the original", () => {
        const shop = createFixtureShop();
        const days = 10;
        const actual = [];

        for (let i = 0; i < days; i++) {
            actual.push(cloneDeep(shop.items));
            shop.updateQuality();
        }

        expect(actual).toMatchSnapshot();
    });
});
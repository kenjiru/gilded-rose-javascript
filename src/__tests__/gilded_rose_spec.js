import { Shop, Item } from '../gilded_rose';

const DEFAULT_ITEM_NAME = "DEFAULT_NAME";
const DEFAULT_ITEM_SELL_IN = 0;
const DEFAULT_ITEM_QUALITY = 0;

const GENERIC_ITEM_NAME = "GENERIC_NAME";
const GENERIC_ITEM_SELL_IN = 5;
const GENERIC_ITEM_QUALITY = 5;

const MIN_QUALITY = 0;
const MAX_QUALITY = 50;

const QUALITY_INCREMENT = 1;
const SELL_IN_INCREMENT = 1;

const MIN_SELL_IN = 0;

const BACKSTAGE_PASS_FIRST_DEADLINE = 10;
const BACKSTAGE_PASS_SECOND_DEADLINE = 5;
const BACKSTAGE_PASS_AFTER_CONCERT = 0;

const BACKSTAGE_PASS_FIRST_INCREMENT = 2;
const BACKSTAGE_PASS_SECOND_INCREMENT = 3;

const BACKSTAGE_PASS_VALUE_AFTER_CONCERT = 0;

const AGED_BRIE = "Aged Brie";
const LEGENDARY = "Sulfuras, Hand of Ragnaros";
const BACKSTAGE_PASS = "Backstage passes to a TAFKAL80ETC concert";

function createShopWithItemValues(name, sellIn, quality) {
    return new Shop([new Item(name, sellIn, quality)]);
}

function createShopWithDefaultItem() {
    return new Shop([createDefaultItem()]);
}

function createShopWithGenericItem() {
    return new Shop([createGenericItem()]);
}

function createGenericItem() {
    return new Item(GENERIC_ITEM_NAME, GENERIC_ITEM_SELL_IN, GENERIC_ITEM_QUALITY);
}

function createDefaultItem() {
    return new Item(DEFAULT_ITEM_NAME, DEFAULT_ITEM_SELL_IN, DEFAULT_ITEM_QUALITY);
}

describe("Gilded Rose", function () {

    describe("Item", () => {
        it("has the correct properties", () => {
            const item = createDefaultItem();

            expect(item.name).toEqual(DEFAULT_ITEM_NAME);
            expect(item.sellIn).toEqual(DEFAULT_ITEM_SELL_IN);
            expect(item.quality).toEqual(DEFAULT_ITEM_QUALITY);
        });
    });

    describe("Shop", () => {
        it("has an empty array by default", () => {
            const shop = new Shop();

            expect(shop.items).toBeDefined();
        });

        it("accepts an array of items", () => {
            const items = [];
            const shop = new Shop(items);

            expect(shop.items).toEqual(items);
        });
    });

    describe("Business Logic", () => {
        describe("Quality", () => {
            it("decreases with each day", () => {
                const shop = createShopWithGenericItem();
                shop.updateQuality();

                const firstItem = shop.items[0];
                expect(firstItem.quality).toEqual(GENERIC_ITEM_QUALITY - QUALITY_INCREMENT);
            });

            it(`does not decrease under the minimum of '${MIN_QUALITY}'`, () => {
                const shop = createShopWithDefaultItem();
                shop.updateQuality();

                const firstItem = shop.items[0];
                expect(firstItem.quality).toEqual(MIN_QUALITY);
            });

            it("after sell in has passed quality decreases twice as fast", () => {
                const shop = createShopWithItemValues(GENERIC_ITEM_NAME, MIN_SELL_IN, GENERIC_ITEM_QUALITY);
                shop.updateQuality();

                const firstItem = shop.items[0];
                expect(firstItem.quality).toEqual(GENERIC_ITEM_QUALITY - QUALITY_INCREMENT * 2);
            });
        });

        describe("Sell In", () => {
            it("decreases with each day", () => {
                const shop = createShopWithGenericItem();
                shop.updateQuality();

                const firstItem = shop.items[0];
                expect(firstItem.quality).toEqual(GENERIC_ITEM_SELL_IN - SELL_IN_INCREMENT);
            });

            it("it can be negative", () => {
                const shop = createShopWithDefaultItem();
                shop.updateQuality();

                const firstItem = shop.items[0];
                expect(firstItem.sellIn).toEqual(-1);
            });
        });

        describe(`${AGED_BRIE}`, () => {
            it("increases in quality with time", () => {
                const shop = createShopWithItemValues(AGED_BRIE, GENERIC_ITEM_SELL_IN, GENERIC_ITEM_QUALITY);
                shop.updateQuality();

                const firstItem = shop.items[0];
                expect(firstItem.quality).toEqual(GENERIC_ITEM_QUALITY + QUALITY_INCREMENT);
            });

            it(`does not exceed the maximum quality of '${MAX_QUALITY}'`, () => {
                const shop = createShopWithItemValues(AGED_BRIE, GENERIC_ITEM_SELL_IN, MAX_QUALITY);
                shop.updateQuality();

                const firstItem = shop.items[0];
                expect(firstItem.quality).toEqual(MAX_QUALITY);
            });
        });

        describe(`${LEGENDARY}`, () => {
            it("does not decrease neither the sell in nor the quality", () => {
                const shop = createShopWithItemValues(LEGENDARY, GENERIC_ITEM_SELL_IN, GENERIC_ITEM_QUALITY);
                shop.updateQuality();

                const firstItem = shop.items[0];
                expect(firstItem.quality).toEqual(GENERIC_ITEM_QUALITY);
                expect(firstItem.sellIn).toEqual(GENERIC_ITEM_SELL_IN);
            });
        });

        describe(`${BACKSTAGE_PASS}`, () => {
            it(`increases in value with '${BACKSTAGE_PASS_FIRST_INCREMENT}' when there are '${BACKSTAGE_PASS_FIRST_DEADLINE}' or less`, () => {
                const shop = createShopWithItemValues(BACKSTAGE_PASS, BACKSTAGE_PASS_FIRST_DEADLINE, GENERIC_ITEM_QUALITY);
                shop.updateQuality();

                const firstItem = shop.items[0];
                expect(firstItem.quality).toEqual(GENERIC_ITEM_QUALITY + BACKSTAGE_PASS_FIRST_INCREMENT);
            });

            it(`increases in value with '${BACKSTAGE_PASS_SECOND_INCREMENT}' when there are '${BACKSTAGE_PASS_SECOND_DEADLINE}' or less`, () => {
                const shop = createShopWithItemValues(BACKSTAGE_PASS, BACKSTAGE_PASS_SECOND_DEADLINE, GENERIC_ITEM_QUALITY);
                shop.updateQuality();

                const firstItem = shop.items[0];
                expect(firstItem.quality).toEqual(GENERIC_ITEM_QUALITY + BACKSTAGE_PASS_SECOND_INCREMENT);
            });

            it(`value drops to '${BACKSTAGE_PASS_VALUE_AFTER_CONCERT}' after the concert`, () => {
                const shop = createShopWithItemValues(BACKSTAGE_PASS, BACKSTAGE_PASS_AFTER_CONCERT, GENERIC_ITEM_QUALITY);
                shop.updateQuality();

                const firstItem = shop.items[0];
                expect(firstItem.quality).toEqual(BACKSTAGE_PASS_VALUE_AFTER_CONCERT);
            });
        })
    });
});

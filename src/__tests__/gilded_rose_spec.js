import {Shop, Item, ItemType} from '../gilded_rose';
import Util from "../util";

describe("Gilded Rose", function () {
    const MAX_QUALITY = 50;

    const shopItems = [
        new Item('+5 Dexterity Vest', 10, 20),
        new Item('Aged Brie', 2, 0),
        new Item('Elixir of the Mongoose', 5, 7),
        new Item('Sulfuras, Hand of Ragnaros', -1, 80),
        new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20),
    ];

    let gildedRoseShop;

    beforeEach(() => {
        gildedRoseShop = new Shop(Util.cloneArray(shopItems));
    });

    it("should have access to gildedRose", () => {
        expect(gildedRoseShop).toBeDefined();
    });

    it("should save the item we pass to the constructor", function () {
        expect(gildedRoseShop.items.length).toEqual(shopItems.length);
    });

    describe("Legendary props", () => {
        it("should not change the quality", () => {
            const NUM_ITERATIONS = 10;
            simulateTime(gildedRoseShop, NUM_ITERATIONS);

            const initialLegendary = Shop.getFirstItemOfGivenType(shopItems, ItemType.LEGENDARY);
            const legendary = gildedRoseShop.getFirstItemOfType(ItemType.LEGENDARY);

            expect(legendary.quality).toEqual(initialLegendary.quality);
            expect(legendary.sellIn).toEqual(initialLegendary.sellIn);
        });
    });

    describe("Aged Brie props", () => {
        it("should increase the quality of Aged Brie item", () => {
            const NUM_ITERATIONS = 1;

            simulateTime(gildedRoseShop, NUM_ITERATIONS);

            const initialAgedBrie = Shop.getFirstItemOfGivenType(shopItems, ItemType.AGED_BRIE);
            const agedBrie = gildedRoseShop.getFirstItemOfType(ItemType.AGED_BRIE);

            expect(agedBrie).toBeDefined();
            expect(agedBrie.quality).toEqual(initialAgedBrie.quality + NUM_ITERATIONS);
            expect(agedBrie.sellIn).toEqual(initialAgedBrie.sellIn - NUM_ITERATIONS);
        });

        it("should increase the quality of Aged Brie twice after the sellIn date", () => {
            const NUM_ITERATIONS = 4;
            simulateTime(gildedRoseShop, NUM_ITERATIONS);

            const initialAgedBrie = Shop.getFirstItemOfGivenType(shopItems, ItemType.AGED_BRIE);
            const agedBrie = gildedRoseShop.getFirstItemOfType(ItemType.AGED_BRIE);

            expect(agedBrie.quality).toEqual(initialAgedBrie.quality + initialAgedBrie.sellIn + (NUM_ITERATIONS - initialAgedBrie.sellIn) * 2);
            expect(agedBrie.sellIn).toEqual(initialAgedBrie.sellIn - NUM_ITERATIONS);
        });

        it("should increase the quality of Aged Brie twice after the sellIn date", () => {
            const NUM_ITERATIONS = 30;
            simulateTime(gildedRoseShop, NUM_ITERATIONS);

            const initialAgedBrie = Shop.getFirstItemOfGivenType(shopItems, ItemType.AGED_BRIE);
            const agedBrie = gildedRoseShop.getFirstItemOfType(ItemType.AGED_BRIE);

            expect(agedBrie.quality).toEqual(MAX_QUALITY);
            expect(agedBrie.sellIn).toEqual(initialAgedBrie.sellIn - NUM_ITERATIONS);
        });
    });

    describe("Ticket props", () => {
        it("should increase the value by 1 if more than 10 days before the sellIn date", () => {
            const NUM_ITERATIONS = 2;

            simulateTime(gildedRoseShop, NUM_ITERATIONS);

            const initialTicket = Shop.getFirstItemOfGivenType(shopItems, ItemType.TICKET);
            const ticket = gildedRoseShop.getFirstItemOfType(ItemType.TICKET);

            expect(ticket).toBeDefined();
            expect(ticket.quality).toEqual(initialTicket.quality + NUM_ITERATIONS);
            expect(ticket.sellIn).toEqual(initialTicket.sellIn - NUM_ITERATIONS);
        });

        it("should increase the value by 2 if less than 10 days before the sellIn date", () => {
            const NUM_ITERATIONS = 10;

            simulateTime(gildedRoseShop, NUM_ITERATIONS);

            const initialTicket = Shop.getFirstItemOfGivenType(shopItems, ItemType.TICKET);
            const ticket = gildedRoseShop.getFirstItemOfType(ItemType.TICKET);

            expect(ticket).toBeDefined();
            expect(ticket.quality).toEqual(initialTicket.quality + NUM_ITERATIONS);
            expect(ticket.sellIn).toEqual(initialTicket.sellIn - NUM_ITERATIONS);
        });
    });
});

function simulateTime(shop, numDays) {
    for (var i = 0; i < numDays; i++) {
        shop.updateQuality();
    }
}

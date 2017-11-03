export const ItemType = {
    LEGENDARY: 'Sulfuras',
    AGED_BRIE: 'Aged Brie',
    TICKET: 'Backstage passes',
    CONJURED: 'Conjured'
};

export class Item {
    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

const MIN_QUALITY = 0;
const MAX_QUALITY = 50;

const QUALITY_INCREMENT = 1;
const SELL_IN_INCREMENT = 1;

const SELL_IN_VALUE = 0;
const TICKET_FIRST_SELL_OUT = 10;
const TICKET_SECOND_SELL_OUT = 5;

export class Shop {
    constructor(items = []) {
        this.items = items;
    }

    updateQuality() {
        for (var i = 0; i < this.items.length; i++) {
            const item = this.items[i];

            this.handleQuality(item);
            this.handleSellIn(item);
            this.handleQualityAfterSellIn(item);
        }

        return this.items;
    }

    handleSellIn(item) {
        if (Shop.isItemOfType(item, ItemType.LEGENDARY) === false) {
            item.sellIn = item.sellIn - SELL_IN_INCREMENT;
        }
    }

    handleQuality(item) {
        if (Shop.isItemOfType(item, ItemType.AGED_BRIE) || Shop.isItemOfType(item, ItemType.TICKET)) {
            this.handleQualityForBrieAndTicket(item);
            return;
        }

        if (item.quality > MIN_QUALITY) {
            if (Shop.isItemOfType(item, ItemType.LEGENDARY) === false) {
                item.quality = item.quality - QUALITY_INCREMENT;
            }
        }
    }

    handleQualityForBrieAndTicket(item) {
        if (item.quality < MAX_QUALITY) {
            item.quality = item.quality + QUALITY_INCREMENT;

            if (Shop.isItemOfType(item, ItemType.TICKET)) {
                this.handleTicketQuality(item);
            }
        }
    }

    handleTicketQuality(item) {
        if (item.sellIn <= TICKET_FIRST_SELL_OUT) {
            if (item.quality < MAX_QUALITY) {
                item.quality = item.quality + QUALITY_INCREMENT;
            }
        }

        if (item.sellIn <= TICKET_SECOND_SELL_OUT) {
            if (item.quality < MAX_QUALITY) {
                item.quality = item.quality + QUALITY_INCREMENT;
            }
        }
    }

    handleQualityAfterSellIn(item) {
        if (item.sellIn >= SELL_IN_VALUE) {
            return;
        }

        if (Shop.isItemOfType(item, ItemType.AGED_BRIE)) {
            if (item.quality < MAX_QUALITY) {
                item.quality = item.quality + QUALITY_INCREMENT;
            }
            return;
        }

        this.handleQualityForNonAgingItems(item);
    }

    handleQualityForNonAgingItems(item) {
        if (Shop.isItemOfType(item, ItemType.TICKET)) {
            item.quality = item.quality - item.quality;
            return;
        }

        if (item.quality > MIN_QUALITY) {
            if (Shop.isItemOfType(item, ItemType.LEGENDARY) === false) {
                item.quality = item.quality - QUALITY_INCREMENT;
            }
        }
    }

    getFirstItemOfType(itemType) {
        return Shop.getFirstItemOfGivenType(this.items, itemType);
    }

    static getFirstItemOfGivenType(items, itemType) {
        return items.find((item) => {
            return Shop.isItemOfType(item, itemType);
        })
    }

    static isItemOfType(item, itemType) {
        return item.name.startsWith(itemType);
    }
}

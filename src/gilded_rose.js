export class Item {
    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

const AGED_BRIE = 'Aged Brie';
const CONCERT_TICKET = 'Backstage passes to a TAFKAL80ETC concert';
const LEGENDARY = 'Sulfuras, Hand of Ragnaros';

const MIN_QUALITY = 0;
const MAX_QUALITY = 50;

const SELLIN_DATE = 0;

function isCheese(item) {
    return item.name === AGED_BRIE;
}

function isConcertTicket(item) {
    return item.name === CONCERT_TICKET;
}

function isLegendary(item) {
    return item.name === LEGENDARY;
}

function increaseQuality(item) {
    if (item.quality < MAX_QUALITY) {
        item.quality += 1;
    }
}

export class Shop {
    constructor(items = []) {
        this.items = items;
    }

    updateQuality() {
        for (var i = 0; i < this.items.length; i++) {
            const item = this.items[i];

            if (isLegendary(item)) {
                return;
            }

            if (isCheese(item) === false && isConcertTicket(item) === false) {
                if (item.quality > MIN_QUALITY) {
                    item.quality -= 1;
                }
            } else {
                if (item.quality < MAX_QUALITY) {
                    item.quality += 1;

                    if (isConcertTicket(item)) {
                        if (item.sellIn < 11) {
                            increaseQuality(item);
                        }
                        if (item.sellIn < 6) {
                            increaseQuality(item);
                        }
                    }
                }
            }

            item.sellIn -= 1;

            if (item.sellIn < SELLIN_DATE) {
                if (isCheese(item) === false) {
                    if (isConcertTicket(item) === false) {
                        if (item.quality > MIN_QUALITY) {
                            item.quality -= 1;
                        }
                    } else {
                        item.quality = MIN_QUALITY;
                    }
                } else {
                    increaseQuality(item);
                }
            }
        }

        return this.items;
    }
}

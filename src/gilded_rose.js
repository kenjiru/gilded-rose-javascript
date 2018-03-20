import * as cheese from "./strategy/cheese";
import * as concertTicket from "./strategy/concertTicket";
import * as legendary from "./strategy/legendary";
import * as normalItem from "./strategy/normalItem";

const strategies = [cheese, concertTicket, legendary];

export class Item {
    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

export const MIN_QUALITY = 0;
export const MAX_QUALITY = 50;
export const QUALITY_INCREMENT = 1;

export const SELLIN_DATE = 0;
export const SELL_IN_INCREMENT = 1;

export class Shop {
    constructor(items = []) {
        this.items = items;
    }

    updateQuality() {
        this.items.forEach((item) => {
            let strategy = strategies.find((strategy) => strategy.isUsableFor(item));

            if (!strategy) {
                strategy = normalItem;
            }

            strategy.update(item);
        });

        return this.items;
    }
}

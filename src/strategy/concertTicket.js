import {SELLIN_DATE} from "../gilded_rose";
import {decreaseQualityToZero, decreaseSellIn, increaseQuality} from "../mutators";

export const CONCERT_TICKET = 'Backstage passes to a TAFKAL80ETC concert';
export const BACKSTAGE_PASS_FIRST_DEADLINE = 10;
export const BACKSTAGE_PASS_SECOND_DEADLINE = 5;

export function isUsableFor(item) {
    return item.name === CONCERT_TICKET;
}

export function update(item) {
    decreaseSellIn(item);
    increaseQuality(item);

    if (item.sellIn < BACKSTAGE_PASS_FIRST_DEADLINE) {
        increaseQuality(item);
    }

    if (item.sellIn < BACKSTAGE_PASS_SECOND_DEADLINE) {
        increaseQuality(item);
    }

    if (item.sellIn < SELLIN_DATE) {
        decreaseQualityToZero(item);
    }
}
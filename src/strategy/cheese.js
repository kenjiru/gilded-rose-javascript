import {SELLIN_DATE} from "../gilded_rose";
import {decreaseSellIn, increaseQuality} from "../mutators";

export const AGED_BRIE = 'Aged Brie';

export function isUsableFor(item) {
    return item.name === AGED_BRIE;
}

export function update(item) {
    decreaseSellIn(item);
    increaseQuality(item);

    if (item.sellIn < SELLIN_DATE) {
        increaseQuality(item);
    }
}
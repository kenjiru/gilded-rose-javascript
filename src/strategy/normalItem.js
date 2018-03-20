import {SELLIN_DATE} from "../gilded_rose";
import {decreaseQuality, decreaseSellIn} from "../mutators";

export function isUsableFor(item) {
    return true;
}

export function update(item) {
    decreaseSellIn(item);
    decreaseQuality(item);

    if (item.sellIn < SELLIN_DATE) {
        decreaseQuality(item);
    }
}
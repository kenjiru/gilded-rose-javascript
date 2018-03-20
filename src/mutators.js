import {MAX_QUALITY, MIN_QUALITY, QUALITY_INCREMENT, SELL_IN_INCREMENT} from "./gilded_rose";

export function increaseQuality(item) {
    if (item.quality < MAX_QUALITY) {
        item.quality += QUALITY_INCREMENT;
    }
}

export function decreaseQuality(item) {
    if (item.quality > MIN_QUALITY) {
        item.quality -= QUALITY_INCREMENT;
    }
}

export function decreaseQualityToZero(item) {
    item.quality = MIN_QUALITY;
}

export function decreaseSellIn(item) {
    item.sellIn -= SELL_IN_INCREMENT;
}
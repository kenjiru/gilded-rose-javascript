export default class Util {
    static cloneArray(arr) {
        return arr.map((item) => Object.assign({}, item));
    }
}
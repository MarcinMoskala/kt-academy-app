// @ts-ignore
interface Array<T> {
    counts(): Record<string, number>;

    maxBy(f: (t: T) => number): T;

    mostCommon(): T;

    chunk(num: number): T[][];
}

Array.prototype["counts"] = function () {
    let counts = {}; //We are going to count occurrence of item here
    for (let i = 0, len = this.length; i < len; i++) {
        let word = "" + this[i];
        if (counts[word] === undefined) { //if count[word] doesn't exist
            counts[word] = 1;    //set count[word] value to 1
        } else {                  //if exists
            counts[word] = counts[word] + 1; //increment existing value
        }
    }
    return counts;
}

Array.prototype["maxBy"] = function (f: (T) => number) {
    if (this.length === 0) return null
    if (this.length === 1) return this[0]

    var maxElement = this[0]
    var maxValue = f(maxElement)

    for (let i = 1, len = this.length; i < len; i++) {
        let element = this[i];
        let value = f(element);
        if (value > maxValue) {
            maxElement = element;
            maxValue = value
        }
    }
    return maxElement;
}

Array.prototype["mostCommon"] = function () {
    if (this.length == 0) return null
    if (this.length == 1) return this[0]
    return Object.entries(this.counts()).maxBy(a => a[1])[0]
}


Array.prototype["chunk"] = function (chunkSize) {
    var R: any[] = [];
    for (var i = 0; i < this.length; i += chunkSize) {
        R.push(this.slice(i, i + chunkSize));
    }
    return R;
}

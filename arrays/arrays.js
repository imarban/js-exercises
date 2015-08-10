/**
 * Created by igomez on 8/7/15.
 */

Array.prototype.each = function (callback) {
    for (var i = 0; i < this.length; i++) {
        callback.call(this, this[i], i);
    }
};

//filter
Array.prototype.where = function (spec) {
    var results = [];

    for (var i = 0; i < this.length; i++) {
        if (spec.call(this, this[i])) {
            results.push(this[i]);
        }
    }

    return results;
};


Array.prototype.any = function (spec) {
    for (var i = 0; i < this.length; i++) {
        if (typeof spec == 'function') {
            if (spec.call(this, this[i])) {
                return true;
            }
        }
        else {
            if (spec === this[i]) {
                return true;
            }
        }
    }

};

//map
Array.prototype.select = function (spec) {
    var results = [];

    for (var i = 0; i < this.length; i++) {
        results.push(spec.call(this, this[i]));
    }

    return results;
};

Array.prototype.take = function (howMany, spec) {
    var results = spec ? this.where(spec) : this;
    return results.slice(0, howMany);

};

//slice
Array.prototype.skip = function (howMany) {
    return this.slice(howMany);
};

Array.prototype.first = function (spec) {
    var results = spec ? this.where(spec) : this;
    return results.length ? results[0] : null;
};

Array.prototype.last = function (spec) {
    var results = spec ? this.where(spec) : this;
    return results.length ? results[results.length - 1] : null;
};

Array.prototype.count = function (spec) {
    return spec ? this.where(spec).length : this.length;
};

Array.prototype.index = function (spec) {
    for (var i = 0; i < this.length; i++) {
        if (typeof spec == 'function') {
            if (spec.call(this, this[i])) {
                return i;
            }
        }
        else {
            if (spec === this[i]) {
                return i;
            }
        }
    }
    return -1;
};


Array.prototype.pluck = function (property) {
    return this.map(function (item) {
        return item[property];
    })
};

Array.prototype.sum = function (spec) {
    if (!this.length) {
        return null;
    }

    var sum = spec instanceof Function ? spec.call(this, this[0]) : this[0];
    for (var i = 1; i < this.length; i++) {
        if (spec instanceof Function) {
            sum += spec.call(this, this[i]);
        }
        else {
            sum += this[i];
        }
    }
    return sum;
};

sort = function (spec) {
    if (!this.length) {
        return [];
    }

    return typeof spec == 'function' ? this.sort(spec) : this.sort(function (a, b) {
        return a - b;
    });
};

Array.prototype.max = function (spec) {
    return sort.call(this, spec)[this.length - 1] || null;
};

Array.prototype.min = function (spec) {
    return sort.call(this, spec)[0] || null;
};

Array.prototype.flatten = function () {
    var result = [];

    var flat = function (arr) {
        for (var i = 0; i < arr.length; i++) {
            if (Array.isArray(arr[i])) {
                flat(arr[i]);
            } else if (arr[i] !== undefined) {
                result.push(arr[i]);
            }
        }
    };

    flat(this);

    return result.length ? result : null;
};
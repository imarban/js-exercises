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

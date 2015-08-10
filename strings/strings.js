/**
 * Created by igomez on 8/7/15.
 */

function StringBuilder() {
    this.buffered = [];
}


StringBuilder.prototype.cat = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] instanceof Function) {
            this.cat.apply(this, arguments[i]());
        }
        else if (Array.isArray(arguments[i])) {
            this.cat.apply(this, arguments[i].flatten());
        }
        else {
            this.buffered.push(arguments[i]);
        }

    }

    return this;
};

var argumentsToArray = function (arguments) {
    var toReturn = [];
    for (var i = 0; i < arguments.length; i++) {
        toReturn.push(arguments[i]);
    }
    return toReturn;
};

StringBuilder.prototype.rep = function () {
    var argumentsArray = argumentsToArray(arguments);

    var words = argumentsArray.slice(0, argumentsArray.length - 1);
    var times = argumentsArray[argumentsArray.length - 1];
    var toPass = [];

    for (var i = 0; i < times; i++) {
        toPass.push(words);
    }

    return this.cat(toPass);
};

StringBuilder.prototype.string = function () {
    return this.buffered.join('');
};

StringBuilder.prototype.catIf = function () {
    for (var i = 0; i < arguments.length - 1; i++) {
        if (arguments[arguments.length - 1]) {
            this.cat(arguments[i])
        }
    }
    return this;
};

StringBuilder.prototype.end = function () {

    return this;
};

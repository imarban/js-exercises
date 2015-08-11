/**
 * Created by igomez on 8/7/15.
 */

function StringBuilder() {
    this.buffered = [];
    this.decoratorStack = [];
}

function Decorator(type) {
    this.type = type;
}

const DECORATORS = {
    WRAP: 'wrap',
    SUSPEND: 'suspend'
};

var applyDecorators = function (property) {

    var toApply = [];

    for (var i = this.decoratorStack.length - 1; i >= 0; i--) {
        if (this.decoratorStack[i].type === DECORATORS.WRAP) {
            toApply.push(this.decoratorStack[i][property]);
        } else {
            break;
        }
    }

    return property == 'prefix' ? toApply.reverse() : toApply;
};

StringBuilder.prototype.cat = function () {
    if (arguments && argumentsToArray(arguments).flatten() != null) {
        concat.call(this, applyDecorators.call(this, 'prefix'));
        concat.apply(this, arguments);
        concat.call(this, applyDecorators.call(this, 'suffix'));
    }

    return this;
};

var concat = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] instanceof Function) {
            concat.call(this, arguments[i].call(this));
        }
        else if (Array.isArray(arguments[i])) {
            concat.apply(this, arguments[i].flatten());
        }
        else {
            this.buffered.push(arguments[i]);
        }
    }
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

    for (var i = 0; i < times; i++) {
        this.cat.call(this, words);
    }

    return this;
};

StringBuilder.prototype.string = function () {
    return this.buffered.join('');
};

StringBuilder.prototype.catIf = function () {
    for (var i = 0; i < arguments.length - 1; i++) {
        if (arguments[arguments.length - 1]) {
            this.cat(arguments[i]);
        }
    }
    return this;
};

StringBuilder.prototype.wrap = function (prefix, suffix) {
    var wrapper = new Decorator(DECORATORS.WRAP);
    wrapper.prefix = prefix;
    wrapper.suffix = suffix;

    this.decoratorStack.push(wrapper);
    return this;
};

StringBuilder.prototype.prefix = function (prefix) {
    var wrapper = new Decorator(DECORATORS.WRAP);
    wrapper.prefix = prefix;
    wrapper.suffix = undefined;

    this.decoratorStack.push(wrapper);
    return this;
};

StringBuilder.prototype.suffix = function (suffix) {
    var wrapper = new Decorator(DECORATORS.WRAP);
    wrapper.prefix = undefined;
    wrapper.suffix = suffix;

    this.decoratorStack.push(wrapper);
    return this;
};

StringBuilder.prototype.suspend = function () {
    var wrapper = new Decorator(DECORATORS.SUSPEND);

    this.decoratorStack.push(wrapper);
    return this;
};

StringBuilder.prototype.each = function (args, callback) {

    for (var i = 0; i < args.length; i++) {
        this.cat(callback.call(this, args[i], i, args));
    }

    return this;

};

StringBuilder.prototype.when = function (expression, thenArgs, otherwiseArgs) {

    var result = expression instanceof Function ? expression() : expression;
    return result ? this.cat(thenArgs) : this.cat(otherwiseArgs);

};

StringBuilder.prototype.end = function (deep) {
    deep = deep || 1;

    for (var i = 0; i < deep; i++) {
        this.decoratorStack.pop();
    }
    return this;
};

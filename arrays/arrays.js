/**
 * Created by igomez on 8/7/15.
 */
Array.prototype.each = function (callback) {
    for (var i = 0; i < this.length; i++) {
        callback.call(this, this[i], i);
    }
};


var people = [
    {name: 'pedro', age: 19},
    {name: 'juan', age: 15},
    {name: 'pablo', age: 16},
    {name: 'pancho', age: 20},
    {name: 'topo', age: 18}
];

people.each(function (x, i) {
    console.log((i + 1) + '.- ' + x.name + ' is ' + x.age + ' years old');
});


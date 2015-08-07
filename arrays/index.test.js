/**
 * Created by igomez on 8/7/15.
 */

var children = [
    {name: 'ana', sex: 'f'},
    {name: 'fosto', sex: 'm'},
    {name: 'jane', sex: 'f'},
    {name: 'yadi', sex: 'f'},
    {name: 'lili', sex: 'f'},
    {name: 'bany', sex: 'm'},
    {name: 'rod', sex: null},
    {name: 'auro', sex: 'f'},
    {name: 'martin', sex: 'm'}
];

console.log(children.index(function (x) {
    return x.name == 'bany';
}));
console.log(children.index(function (x) {
    return x.name == 'mark';
}));
console.log([1, 3, 5, 7, 9, 11].index(7));


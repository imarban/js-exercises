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

console.log(children.count() + ' children');
console.log(children.count(function (x) {
        return x.sex === 'f';
    }) + ' are female');



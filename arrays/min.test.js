/**
 * Created by igomez on 8/7/15.
 */

var people = [
    {name: 'pedro', age: 29, skills: ['C#', 'Asp.Net', 'OOP']},
    {name: 'juan', age: 23, skills: ['PHP', 'Drink tea']},
    {name: 'pablo', age: 26, skills: ['RoR', 'HTML/CSS']}
];

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

console.log([1, 3, 5, 7, 9, 11, 2, 4, 6].min());
console.log(children.min(function (a, b) {
    return a.name.length - b.name.length
}).name);
console.log(people.min(function (a, b) {
    return a.age - b.age;
}).name);




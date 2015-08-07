/**
 * Created by igomez on 8/7/15.
 */

var people = [
    {name: 'pedro', age: 29, skills: ['C#', 'Asp.Net', 'OOP']},
    {name: 'juan', age: 23, skills: ['PHP', 'Drink tea']},
    {name: 'pablo', age: 26, skills: ['RoR', 'HTML/CSS']}
];

console.log([1, 3, 5, 7, 9, 11].sum());
console.log([1, 3, 5, 7, 9, 11].sum(function (x) {
    return x * 2;
}));
console.log(people.sum(function (x) {
    return x.age;
}));

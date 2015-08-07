/**
 * Created by igomez on 8/7/15.
 */

var people = [
        {name: 'pedro', age: 29, skills: ['C#', 'Asp.Net', 'OOP']},
        {name: 'juan', age: 23, skills: ['PHP', 'Drink tea']},
        {name: 'pablo', age: 26, skills: ['RoR', 'HTML/CSS']}
    ],

    logPerson = function (x, i) {
        console.log((i + 1) + '.- ' + x.name + ' is ' + x.age + ' years old');
    };

console.log('hire the following guys');
people.where(function (dev) {
    var skills = dev.skills.where(function (skill) {
        return skill == 'PHP';
    });
    return skills.length == 0;
}).each(logPerson);


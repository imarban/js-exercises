/**
 * Created by igomez on 8/7/15.
 */

var sb = new StringBuilder(),
    people = [
        {name: 'pedro', sex: 'm', age: 30},
        {name: 'leticia', sex: 'f', age: 21},
        {name: 'pablo', sex: 'm', age: 20}
    ];

sb
    .wrap('<p>', ['</p>', '\n'])
    .each(people, function (person) {
        this.when(person.sex == 'm',
            function () {
                return person.name + ' is male';
            },
            [person.name, ' is female']
        );
    });


console.log(sb.string());
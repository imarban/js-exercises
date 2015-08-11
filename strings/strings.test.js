/**
 * Created by igomez on 8/7/15.
 */

var expect = chai.expect;

describe("String Builder", function () {
    describe("simple cat", function () {
        it("checking if simple cat is working", function () {
            var sb = new StringBuilder();
            sb.cat('hello');
            sb.cat(' Javascript', ' crazy', ' world').cat('!!!');

            expect(sb.string()).to.equal('hello Javascript crazy world!!!');
        });


        it("function as parameters test", function () {
            var sb = new StringBuilder();
            sb.cat('this is the first', ' line', '\n')
                .cat('here is the second\n')
                .cat('and then', 'the third\n')
                .cat('now', function () {
                    return ' we can make some calcs';
                }, ' here');

            expect(sb.string()).to.equal('this is the first line\nhere is the second\nand thenthe third\nnow ' +
                'we can make some calcs here');
        });

        it("arrays as parameter", function () {
            var sb = new StringBuilder();
            sb
                .cat('this', [' is', ' a', ' string'], ' in the')
                .cat(' array', ' :-)');

            expect(sb.string()).to.equal('this is a string in the array :-)');
        });


        it("arrays and functions as parameter", function () {
            var sb = new StringBuilder();
            sb
                .cat('this', [' is', function () {
                    return [' a', ' function that',
                        ' returns an array'];
                }], ' ;)');

            expect(sb.string()).to.equal('this is a function that returns an array ;)');
        });

    });

    describe('rep. Concatenating same strings a given number of times', function () {
        //rep
        it("A single word case", function () {
            var sb = new StringBuilder();
            sb.cat('Mom, can you').rep(' please', 10).cat(' buy me an ice cream');

            expect(sb.string()).to.equal('Mom, can you please please please please please please please please please ' +
                'please buy me an ice cream');
        });

        it("A multiple word case", function () {
            var sb = new StringBuilder();
            sb.cat('Mom, I').rep(' love', ' you', 10);

            expect(sb.string()).to.equal('Mom, I love you love you love you love you love you love you love you love ' +
                'you love you love you');
        });

        it("A null number of times", function () {
            var sb = new StringBuilder();
            sb.cat('Mom, I').rep(' love', ' you', null);

            expect(sb.string()).to.equal('Mom, I');
        });

        it("An undefined number of times", function () {
            var sb = new StringBuilder();
            sb.cat('Mom, I').rep(' love', ' you', undefined);

            expect(sb.string()).to.equal('Mom, I');
        });

        it("A number of times as string", function () {
            var sb = new StringBuilder();
            sb.cat('Mom, I').rep(' love', ' 2');

            expect(sb.string()).to.equal('Mom, I love love');
        });

        it("Sending a parameter only", function () {
            var sb = new StringBuilder();
            sb.cat('Mom, I').rep('love');

            expect(sb.string()).to.equal('Mom, I');
        });

        it("No parameters", function () {
            var sb = new StringBuilder();
            sb.cat('Mom, I').rep();

            expect(sb.string()).to.equal('Mom, I');
        });

    });

    describe('catIf. Concatenating strings if a condition is satisfied', function () {
        //rep
        it("An undefined condition", function () {
            var sex = undefined;
            var sb = new StringBuilder();

            sb.cat('Hello').catIf(' and', ' good', 'bye!', !sex);

            expect(sb.string()).to.equal('Hello and goodbye!');
        });

        it("A true condition", function () {
            var sex = 'f';
            var sb = new StringBuilder();

            sb.cat('Hello').catIf(' pretty', ' lady!', sex === 'f');

            expect(sb.string()).to.equal('Hello pretty lady!');
        });

        it("A false condition", function () {
            var sex = 's';
            var sb = new StringBuilder();

            sb.cat('Hello').catIf(' pretty', ' lady!', sex === 'f');

            expect(sb.string()).to.equal('Hello');
        });

        it("No parameters", function () {
            var sb = new StringBuilder();

            sb.cat('Hello').catIf();

            expect(sb.string()).to.equal('Hello');
        });

        it("No condition", function () {
            var sb = new StringBuilder();
            sb.cat('Hello').catIf();
            expect(sb.string()).to.equal('Hello');
        });
    });


    describe('wrap. Surrounding a string by prefix and suffix', function () {
        //rep
        it("Ideal case", function () {
            var sb = new StringBuilder();

            sb.cat('<ul>', '\n')
                .wrap('<li>', ['</li>', '\n'])
                .rep('list item', 3);

            expect(sb.string()).to.equal('<ul>\n<li>list item</li>\n<li>list item</li>\n<li>list item</li>\n');
        });

        it("An undefined prefix parameter", function () {
            var sb = new StringBuilder();

            sb.cat('<ul>', '\n')
                .wrap(undefined, '</li>')
                .rep('list item', 3);

            expect(sb.string()).to.equal('<ul>\nlist item</li>list item</li>list item</li>');
        });

        it("A null suffix parameter", function () {
            var sb = new StringBuilder();

            sb.wrap(' 1 ', null).rep('list item', 3);

            expect(sb.string()).to.equal(' 1 list item 1 list item 1 list item');
        });

    });

    describe('end. End is a function that cancels the last decorator', function () {
        //rep
        it("No deep parameter", function () {
            var sb = new StringBuilder();

            sb.cat('<ul>', '\n')
                .wrap('-', '.')
                .rep('list item', 3)
                .end()
                .cat('</ul>');

            expect(sb.string()).to.equal('<ul>\n-list item.-list item.-list item.</ul>');
        });

        it("No deep parameter with more than one wrap in the builder", function () {
            var sb = new StringBuilder();

            sb.wrap('-', '-')
                .wrap('*', '*')
                .rep('list item', 2)
                .end()
                .cat('%');

            expect(sb.string()).to.equal('-*list item*--*list item*--%-');
        });


        it("A deep parameter greater than 1", function () {
            var sb = new StringBuilder();

            sb.wrap('-', '-')
                .wrap('*', '*')
                .rep('list item', 2)
                .end(2)
                .cat('%');

            expect(sb.string()).to.equal('-*list item*--*list item*-%');
        });

    });

    describe('prefix ', function () {
        //rep
        it("Ideal case", function () {
            var sb = new StringBuilder();
            sb.cat('Todo list: \n')
                .prefix('  - ')
                .cat('first thing to do\n');

            expect(sb.string()).to.equal('Todo list: \n  - first thing to do\n');
        });

        it("End method after prefix decorator", function () {
            var sb = new StringBuilder();
            sb.cat('Todo list: \n')
                .prefix('  - ')
                .cat('first thing to do\n')
                .end()
                .cat('for this week');

            expect(sb.string()).to.equal('Todo list: \n  - first thing to do\nfor this week');
        });

        it("Undefined prefix", function () {
            var sb = new StringBuilder();
            sb.cat('Todo list: \n')
                .prefix(undefined)
                .cat('first thing to do\n')
                .end()
                .cat('for this week');

            expect(sb.string()).to.equal('Todo list: \nfirst thing to do\nfor this week');
        });


    });

    describe('suffix ', function () {
        it("Ideal case", function () {
            var sb = new StringBuilder();
            sb.cat('Todo list: \n')
                .suffix('  - ')
                .cat('first thing to do\n');

            expect(sb.string()).to.equal('Todo list: \nfirst thing to do\n  - ');
        });

        it("End method after suffix decorator", function () {
            var sb = new StringBuilder();
            sb.cat('Todo list: \n')
                .suffix('  - ')
                .cat('first thing to do\n')
                .end()
                .cat('for this week');

            expect(sb.string()).to.equal('Todo list: \nfirst thing to do\n  - for this week');
        });

        it("Undefined suffix", function () {
            var sb = new StringBuilder();
            sb.cat('Todo list: \n')
                .suffix(undefined)
                .cat('first thing to do\n')
                .end()
                .cat('for this week');

            expect(sb.string()).to.equal('Todo list: \nfirst thing to do\nfor this week');
        });


    });


    describe('each ', function () {
        it("Ideal case", function () {
            var sb = new StringBuilder(),
                people = [
                    {name: 'pedro', sex: 'm', age: 30},
                    {name: 'leticia', sex: 'f', age: 21},
                    {name: 'pablo', sex: 'm', age: 20}
                ];
            sb
                .cat('<table>')
                .cat('<thead><tr><th>Name</th><th>Sex</th><th>Age</td></thead>')
                .cat('<tbody>')
                .each(people, function (value, index, thePeople) {
                    this
                        .cat('<tr>')
                        .cat('<td>', value.name, '</td>')
                        .cat('<td>', value.sex, '</td>')
                        .cat('<td>', value.age, '</td>')
                        .end()
                        .cat('</tr>');
                })
                .end()
                .cat('</tbody>')
                .end()
                .cat('</table>');

            expect(sb.string()).to.equal('<table><thead><tr><th>Name</th><th>Sex</th><th>Age</td></thead><tbody><tr>' +
                '<td>pedro</td><td>m</td><td>30</td></tr><tr><td>leticia</td><td>f</td><td>21</td></tr><tr><td>pablo</td>' +
                '<td>m</td><td>20</td></tr></tbody></table>');
        });


    });

    describe('suspend. this method must “suspend” or “pause” the applied effects', function () {
        it("Ideal case", function () {
            var sb = new StringBuilder(),
                sections = ['section 1', 'section 2', 'section 3'];
            sb
                .suffix('\n')
                .cat('<body>')
                .wrap('<section>', '</section>')
                .each(sections, function (section, index) {
                    this
                        .cat('<h1>', section, '</h1>', function () {
                            this
                                .suspend()
                                .wrap('<p>', '</p>')
                                .cat('first paragraph')
                                .cat('second paragraph')
                                .end(2);
                        })
                })
                .end(2)
                .cat('</body>');


            expect(sb.string()).to.equal('<body>\n' +
                '<section><h1>section 1</h1><p>first paragraph</p><p>second paragraph</p></section>\n' +
                '<section><h1>section 2</h1><p>first paragraph</p><p>second paragraph</p></section>\n' +
                '<section><h1>section 3</h1><p>first paragraph</p><p>second paragraph</p></section>\n' +
                '</body>');
        });


    });

    describe('when. This method must evaluate the expression and call the cat() ' +
        'method with the thenArgs or otherwiseArgs depending on the result of evaluation', function () {
        it("Ideal case", function () {
            var sb = new StringBuilder(),
                people = [
                    {name: 'pedro', sex: 'm', age: 30},
                    {name: 'leticia', sex: 'f', age: 21},
                    {name: 'pablo', sex: 'm', age: 20}
                ];

            sb
                .suffix('\n')
                .wrap('<p>', '</p>')
                .each(people, function (person) {
                    this.when(person.sex == 'm',
                        function () {
                            return person.name + ' is male';
                        },
                        [person.name, ' is female']
                    );
                });

            expect(sb.string()).to.equal('<p>pedro is male</p>\n<p>leticia is female</p>\n<p>pablo is male</p>\n');
        });


    });

});
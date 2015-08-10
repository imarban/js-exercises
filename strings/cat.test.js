/**
 * Created by igomez on 8/7/15.
 */

var sex = 'f';
var sb = new StringBuilder();
sb.cat('Hello')
    .catIf(' pretty', ' lady!', sex === 'f')
    .catIf(' gentleman!', sex === 'm')
    .catIf(' and', ' good', 'bye!', !sex);

console.log(sb.string());
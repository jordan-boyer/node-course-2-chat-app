var moment = require('moment');

/* var date = new Date();
var mounth = ['Jan', 'Feb'];
console.log(date.getMonth()); */

var date = moment();

console.log(date.format('MMM'));
const moment = require('moment');

// let date = new Date();
// console.log(date.getMonth());

// Jan 1st 1970 
// let date = moment('19700101');
// date.add(15,'year');
// console.log(date.format('MMM Do, YYYY'));
// // 2:28 pm
// console.log()
let d = new Date();
let date = moment(d);
console.log(date.format('MMM Do YYYY : h:mm a'));
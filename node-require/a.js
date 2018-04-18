const path = require('path');
const b = require('./b.js');

console.log(b);

b.age++;

// console.log(b);

//
// setTimeout(() => {
//     // var c = require('./b.js');
//     console.log(b);
// }, 1000);

// delete require.cache[require.resolve('./b.js')]

// function a() {
//     var name = {
//         age: 11
//     };
//     setTimeout(() => {
//         name.age = 12;
//     }, 100);
//     return name;
// }
//
// var b = a();
//
// console.log(b);
//
// setTimeout(() => {
//     console.log(b);
// }, 1000);

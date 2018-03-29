var one = document.getElementById('one');
var two = document.getElementById('two');
var three = document.getElementById('three');
var four = document.getElementById('four');


// var handler = function(event) {
//     console.log(event);
//     console.log(123);
// }
//
// four.onclick = function(event) {
//     console.log(1234);
// }
// three.addEventListener('click', function(e) {
//   console.log(e);
//   console.log(e.target);
//   console.log(e.currentTarget);
//   console.log(e.currentTarget === this);
//   console.log(e.currentTarget === three);
//   console.log(this);
// });


//
// function test() {
//   console.log(event);
// }

// var a = function(e) {
//     console.log(e.srcElement);
//     console.log(this);
// }
// three.addEventListener('click', function());
// three.attachEvent('onclick', function(e) {
//     var a = function() {
//         console.log(e.srcElement);
//         console.log(this);
//     }
//     return a.apply(three)
// });



// four.addEventListener('click', function() {
//   console.log('catch four');
//   console.log(event.eventPhase);
// }, true);
//
//
// three.addEventListener('click', function() {
//   console.log('catch three');
//   console.log(event.eventPhase);
// }, true);
//
// two.addEventListener('click', function() {
//   console.log('catch two');
//   console.log(event.eventPhase);
// }, true);
//
// one.addEventListener('click', function(event) {
//   console.log('catch one');
//   console.log(event.eventPhase);
//   // event.cancelBubble = true;
//   event.stopPropagation();
// }, true);
//
// four.addEventListener('click', function(event) {
//     console.log('four');
//     console.log(event.eventPhase);
//     event.cancelBubble();
// });
//
// three.addEventListener('click', function() {
//     console.log('three');
//     console.log(event.eventPhase);
// });
//
// two.addEventListener('click', function() {
//     console.log('two');
//     console.log(event.eventPhase);
// });
//
// one.addEventListener('click', function() {
//     console.log('one');
//     console.log(event.eventPhase);
// });

// four.attachEvent('onclick', function() {
//   console.log('catch four');
//   console.log(event.eventPhase);
// });
//
// three.attachEvent('onclick', function() {
//   console.log('catch three');
//   console.log(event);
//   event.cancelBubble = true;
// });
//
// two.attachEvent('onclick', function() {
//   console.log('catch two');
//   console.log(event.eventPhase);
// });
//
// one.attachEvent('onclick', function(event) {
//   console.log('catch one');
//   console.log(event.eventPhase);
//   // event.stopPropagation();
// });
//

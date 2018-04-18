var c = [1, 2, 3];
var map1 = Immutable.Map({
    a: c,
    b: 2,
    c: 3
});
console.log(map1);

c.push(4);
var map2 = map1.set('b', 50);


console.log(map1.get('a'));
console.log(map2.get('a'));
console.log(map1.get('a') === map2.get('a'));

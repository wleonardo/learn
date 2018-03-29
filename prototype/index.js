var a = function() {

}
a.prototype.like = function() {
    console.log('like');
};

var b = function() {

};
var c = function() {

};
c.prototype = a.prototype;
b.prototype = new c();

b.prototype.test = function() {
    console.log('test');
}

var d = new b();

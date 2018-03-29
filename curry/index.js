const _curry1 = function(fn) {
    return function(...args) {
        if (args.length == 0) {
            return fn;
        } else {
            return fn.apply(this, args);
        }
    }
}

const _curry2 = function(fn) {
    return function(a, b) {
        if (arguments.length == 0) {
            return fn;
        } else if (arguments.length == 1) {
            return _curry1(function(_b) {
                return fn(a, _b);
            });
        } else if (arguments.length >= 2) {
            return fn.apply(this, arguments);
        }
    }
}

const _curry3 = function(fn) {
    return function(a, b) {
        if (arguments.length == 0) {
            return fn;
        } else if (arguments.length == 1) {
            return _curry2(function(_b, _c) {
                return fn(a, _b, _c);
            });
        } else if (arguments.length == 2) {
            return _curry1(function(_c) {
                return fn(a, b, _c);
            });
        } else if (arguments.length >= 3) {
            return fn.apply(this, arguments);
        }
    }
}


const _curryN = function(fn) {
    return function(a, b) {
        if (arguments.length == 0) {
            return fn;
        } else if (arguments.length == 1) {
            return _curry2(function(_b, _c) {
                return fn(a, _b, _c);
            });
        } else if (arguments.length == 2) {
            return _curry1(function(_c) {
                return fn(a, b, _c);
            });
        } else if (arguments.length >= 3) {
            return fn.apply(this, arguments);
        }
    }
}

const test = function(a, b, c) {
    return a + b + c;
}

const curryTest = _curry3(test);

var two = curryTest(1, 2, 3);

console.log(two);

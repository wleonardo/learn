"use strict";

var a = {
    test: function() {
        console.log(this);
    }
}

var c = a.test;
c();

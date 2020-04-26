'use strict';

var a = (function () {
    function a() {
        this.name = "123";
    }
    a.prototype.getName = function () {
        return this.name;
    };
    return a;
}());

module.exports = a;

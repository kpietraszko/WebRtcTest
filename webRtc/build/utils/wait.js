"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (ms) { return new Promise(function (resolve) {
    setHrTimeout(process.hrtime.bigint(), ms * 1e6, resolve);
}); });
function setHrTimeout(startTime, delay, callback) {
    var currentTime = process.hrtime.bigint();
    if (process.hrtime.bigint() - startTime > delay) {
        callback();
        return;
    }
    setImmediate(function () { setHrTimeout(startTime, delay, callback); });
}

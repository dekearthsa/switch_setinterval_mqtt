"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.funcStopInterval = void 0;
const funcStopInterval = (intervalFunc) => {
    console.log("interval stopped.");
    clearInterval(intervalFunc);
};
exports.funcStopInterval = funcStopInterval;

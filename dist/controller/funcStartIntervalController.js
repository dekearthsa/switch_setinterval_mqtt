"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.funcStartInterval = void 0;
const funcStartInterval = (status) => {
    console.log("Start interval...");
    let counting = 0;
    if (status === false) {
        const testInterval = setInterval(() => {
            counting += 1;
            console.log("On print testing interval loop. ", counting);
        }, 1000);
        return testInterval;
    }
};
exports.funcStartInterval = funcStartInterval;

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const mqtt = require("mqtt");
const { funcStartInterval } = require("./controller/funcStartIntervalController");
const { funcStopInterval } = require("./controller/funcStopIntervalController");
const connMQTT = "mqtt://broker.mqttdashboard.com:1883";
const mqttClient = mqtt.connect(connMQTT, {
    username: "admin",
    password: "1234"
});
mqttClient.on("connect", () => {
    console.log("MQTT service is connected");
    mqttClient.subscribe("test/abc/topic", (err) => {
        if (err) {
            console.log("err subcribe: ", err);
        }
    });
    let stopStatus = false;
    let starter = false;
    let myFunc;
    if (!starter) {
        const funcIntervalOut = funcStartInterval(stopStatus);
        starter = true;
        myFunc = funcIntervalOut;
    }
    mqttClient.on("message", (topic, message) => __awaiter(void 0, void 0, void 0, function* () {
        const jsonData = JSON.parse(message);
        stopStatus = jsonData.status;
        if (jsonData.status === true) {
            funcStopInterval(myFunc);
        }
        else {
            const funcIntervalOut = funcStartInterval(jsonData.status);
            myFunc = funcIntervalOut;
        }
    }));
});

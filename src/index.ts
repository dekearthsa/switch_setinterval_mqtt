const mqtt = require("mqtt");
const {funcStartInterval} = require("./controller/funcStartIntervalController")
const {funcStopInterval} = require("./controller/funcStopIntervalController")
const connMQTT = "mqtt://broker.mqttdashboard.com:1883";
const mqttClient = mqtt.connect(
    connMQTT,
    {
        username: "admin",
        password: "1234"
    }
)

mqttClient.on("connect", () => {
    console.log("MQTT service is connected");
    mqttClient.subscribe("test/abc/topic", (err: any) => {
        if(err){
            console.log("err subcribe: ", err)
        }
    })

    let stopStatus = false;
    let starter = false; 
    let myFunc:any
    if(!starter){
        const funcIntervalOut =  funcStartInterval(stopStatus);
        starter = true;
        myFunc = funcIntervalOut;
    }

    mqttClient.on("message", async (topic: string, message: string) => {
        const jsonData = JSON.parse(message);
        stopStatus = jsonData.status;
        if(jsonData.status === true){
            funcStopInterval(myFunc);
        }else{
            const funcIntervalOut =  funcStartInterval(jsonData.status);
            myFunc = funcIntervalOut;
        }
    })
    

    
    
})

 





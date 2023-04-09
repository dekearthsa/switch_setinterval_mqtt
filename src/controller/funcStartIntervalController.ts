const funcStartInterval = (status: boolean) => {
    console.log("Start interval...")
    let counting = 0;
    if(status === false){
        const testInterval = setInterval(() => {
            counting += 1;
            console.log("On print testing interval loop. ", counting);
        },1000)
        return testInterval;
    }
} 


export {funcStartInterval}

const funcStopInterval = (intervalFunc: any) => {
    console.log("interval stopped.")
    clearInterval(intervalFunc)
}

export {funcStopInterval}
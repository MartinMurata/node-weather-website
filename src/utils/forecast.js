const request = require('request')
//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const forecast = (lat,long,callback) => {
    const url = 'https://api.darksky.net/forecast/2a1b23f27c4fa69be3ce5c58c1d44863/'+ lat +','+ long +'?units=us'
    request({url,json: true},(error,{body})=>{
        if(error){
            //400 error
            callback('Unable to connect to weather service',undefined)
        }else if(body.error){
            callback(body.error, undefined)
        }else{
            const data = body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is ' + 
                body.currently.precipProbability + '% chance of rain with ' + body.currently.humidity + ' humidity.'
            callback(undefined, data)
        }
    })
}
module.exports = forecast
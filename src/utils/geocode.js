const request = require('request')

const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + /* for special characters */
    '.json?access_token=pk.eyJ1IjoibW11cmF0YSIsImEiOiJjanp6dnY4OXIxMjdxM29xZHo3OHB2aTJtIn0.XNyL2GgFnJX-jA_1Y1abSg'
    request({url, json : true},(error,{body})=>{
        if(error){
            callback('Unable to connect to location services',undefined)
        }else if(body.features.length === 0){
            callback('Unable to find location. Try another search',undefined)
        }else{
            callback(undefined,{
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}
module.exports = geocode
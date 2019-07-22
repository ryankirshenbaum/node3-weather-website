const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/c6ff33000ea0f77eee81e7f45de48ca6/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '?units=si'
        request({ url: url, json: true}, (error, response) => {
        if (error){
            callback('Unable to connect to weather services.', undefined)
        } else if (response.body.error) {
            console.log('Unable to find location. Try another search', undefined)
        } else {
            callback(undefined, {
                dailyForecast: response.body.daily.data[0].summary + ' It is currently ' + response.body.currently.temperature + ' degrees out. There is a ' + response.body.currently.precipProbability +'% chance of rain.'
            })
            
        }
    })
}

module.exports = forecast

const request = require('postman-request')


const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=dcd595713276fde7e32be2f847dd435c&query=${latitude},${longitude}&units=f`

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback("Unable to connect to weather service!!", undefined)
        } else if (body.error) {
            callback('Unable to find location!!', undefined)
        } else {
            console.log(body.current)
            callback(undefined,
                `Its ${body.current.weather_descriptions[0]} out. 
                The temperature is ${body.current.temperature}. It feels like ${body.current.feelslike}  
                The humidity is ${body.current.humidity} and the precipitation is ${body.current.precip}`
            )
        }
    })
}

module.exports = forecast
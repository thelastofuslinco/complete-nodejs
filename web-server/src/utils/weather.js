const request = require('postman-request')
const key = process.env.WEATHER_KEY
const limit = 1

const weather = (location, callback) => {
  const uri = `http://api.weatherstack.com/current?access_key=${key}&query=${location}&limit=${limit}`

  request(uri, (error, response) => {
    const data = response && JSON.parse(response.body)

    if (error) {
      callback('Unable to connect to weather service', null)
    } else if (data.error) {
      callback('Unable to find location', null)
    } else {
      const weather = data.current

      callback(null, weather)
    }
  })
}

module.exports = weather

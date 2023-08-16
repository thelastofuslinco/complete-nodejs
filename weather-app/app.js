const geocode = require('./utils/geocode')
const weather = require('./utils/weather')

geocode('Maceio Alagoas', (error, position) => {
  const location = [position.latitude, position.longitude].join(',')
  console.log(position)

  weather(location, (error, weatherData) => {
    console.log(weatherData)
  })
})

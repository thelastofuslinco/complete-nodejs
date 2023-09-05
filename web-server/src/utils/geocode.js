const request = require('postman-request')
const key = process.env.GEOCODE_KEY
const limit = 1

const geocode = (location, callback) => {
  const uri = `http://api.positionstack.com/v1/forward?access_key=${key}&query=${location}&limit=${limit}`

  request(uri, (error, response) => {
    const data = response && JSON.parse(response.body)

    if (error) {
      callback('Unable to connect to position service', null)
    } else if (data.error) {
      callback('Unable to find location', null)
    } else {
      callback(null, data.data[0])
    }
  })
}

module.exports = geocode

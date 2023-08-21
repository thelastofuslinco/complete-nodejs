const geocode = require('./utils/geocode')
const weather = require('./utils/weather')
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    author: 'Lincoln Duarte'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    author: 'Lincoln Duarte'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help page',
    author: 'Lincoln Duarte'
  })
})

app.get('/products', (req, res) => {
  const { search } = req.query
  if (!search) return res.send({ error: 'You must provide a search value.' })

  console.log(search)
  res.send({ products: [] })
})

app.get('/weather', (req, res) => {
  const { address } = req.query
  if (!address) return res.send({ error: 'You must provide a address.' })

  geocode(address, (error, position) => {
    if (error) return res.send({ error })

    const positionData = [position.latitude, position.longitude].join(',')
    const location = [position.county, position.region, position.country].join(
      ', '
    )

    weather(positionData, (error, weatherData) => {
      if (error) return res.send({ error })

      res.send({
        weather: weatherData.weather_descriptions[0],
        location,
        address
      })
    })
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'Help page',
    errorMessage: 'this article not exists!',
    author: 'Lincoln Duarte'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    author: 'Lincoln Duarte',
    errorMessage: 'Page not found.'
  })
})

app.listen(port, () => {
  console.log(`http://localhost:${port}/`)
})

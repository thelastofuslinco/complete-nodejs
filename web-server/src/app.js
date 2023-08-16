const path = require('path')
const express = require('express')

const app = express()
const publicDirPath = path.join(__dirname, '../public')

app.set('view engine', 'hbs')
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

app.get('/weather', (req, res) => {
  res.send('weather')
})

app.listen(3000, (listen) => {
  console.log('http://localhost:3000/')
})

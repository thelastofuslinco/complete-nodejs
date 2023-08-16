const path = require('path')
const express = require('express')

const app = express()
const publicDirPath = path.join(__dirname, '../public')
console.log(publicDirPath)

app.use(express.static(publicDirPath))

app.get('/help', (req, res) => {
  res.send('Help page')
})

app.get('/about', (req, res) => {
  res.send('About page')
})

app.get('/weather', (req, res) => {
  res.send('weather')
})

app.listen(3000, (listen) => {
  console.log('http://localhost:3000/')
})

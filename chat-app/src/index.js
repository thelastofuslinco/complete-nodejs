const path = require('path')
const express = require('express')
const { createServer } = require('http')
const { Server } = require('socket.io')
const Message = require('./models/message')

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer)

const port = process.env.PORT
const publicDirPath = path.join(__dirname, '../public')

app.use(express.static(publicDirPath))

const messages = new Array()

io.on('connection', (socket) => {
  socket.emit(
    'welcome',
    messages.map((message) => message.getMessage())
  )

  socket.broadcast.emit(
    'message',
    new Message('A new user has joined!').getMessage()
  )

  socket.on('send_message', (message, callback) => {
    messages.push(new Message(message))
    io.emit('message', new Message(message).getMessage())
    callback()
  })

  socket.on('disconnect', () => {
    io.emit('message', new Message('A user has left!').getMessage())
  })
})

httpServer.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})

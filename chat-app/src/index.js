const path = require('path')
const express = require('express')
const { createServer } = require('http')
const { Server } = require('socket.io')
const { generateMessage } = require('./utils/message')
const { addUser, removeUser, getUser, getUsersInRoom } = require('./utils/user')

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer)

const port = process.env.PORT
const publicDirPath = path.join(__dirname, '../public')

app.use(express.static(publicDirPath))

io.on('connection', (socket) => {
  socket.on('join', (options, callback) => {
    const { error, user } = addUser({ id: socket.id, ...options })

    if (error) {
      return callback(error)
    }

    socket.join(user.room)

    socket.emit('message', generateMessage('Server', 'welcome'))

    socket.broadcast
      .to(user.room)
      .emit(
        'message',
        generateMessage('Server', `${user.username} has joined!`)
      )

    io.to(user.room).emit('roomData', {
      room: user.room,
      users: getUsersInRoom(user.room)
    })

    callback()
  })

  socket.on('send_message', (message, callback) => {
    const user = getUser(socket.id)
    io.to(user.room).emit('message', generateMessage(user.username, message))
    callback()
  })

  socket.on('disconnect', () => {
    const user = removeUser(socket.id)

    if (user) {
      io.to(user.room).emit(
        'message',
        generateMessage('Server', `${user.username} has left!`)
      )

      io.to(user.room).emit('roomData', {
        room: user.room,
        users: getUsersInRoom(user.room)
      })
    }
  })
})

httpServer.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})

const express = require('express')
require('./database/mongoose')
const UserModel = require('./models/user')
const TaskModel = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

// User route
app.get('/users', (req, res) => {
  res.send('get user')
})

app.get('/users/:id', (req, res) => {
  const { id } = req.params
  console.log(id)

  res.send('get user by id')
})

app.post('/users', (req, res) => {
  const userDoc = new UserModel(req.body)

  userDoc
    .save()
    .then(() => res.status(201).send(userDoc))
    .catch((error) => res.status(400).send(error))
})

app.delete('/users/:id', (req, res) => {
  const { id } = req.params
  console.log(id)

  res.send('delete user')
})

app.patch('/users/:id', (req, res) => {
  const { id } = req.params
  console.log(id)

  res.send('update user')
})

// Task route
app.get('/tasks', (req, res) => {
  res.send('get user')
})

app.get('/tasks/:id', (req, res) => {
  const { id } = req.params
  console.log(id)

  res.send('get tasks by id')
})

app.post('/tasks', (req, res) => {
  const taskDoc = new TaskModel(req.body)

  taskDoc
    .save()
    .then(() => res.status(201).send(taskDoc))
    .catch((error) => res.status(400).send(error))
})

app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params
  console.log(id)

  res.send('delete tasks')
})

app.patch('/tasks/:id', (req, res) => {
  const { id } = req.params
  console.log(id)

  res.send('update tasks')
})

app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})

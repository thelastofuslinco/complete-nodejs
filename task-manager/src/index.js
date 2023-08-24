const express = require('express')
require('./database/mongoose')
const UserModel = require('./models/user')
const TaskModel = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

// User route
app.get('/users', async (req, res) => {
  try {
    const users = await UserModel.find()

    res.send(users)
  } catch (error) {
    res.status(500).send()
  }
})

app.get('/users/:id', async (req, res) => {
  const { id } = req.params

  try {
    const user = await UserModel.findById(id)

    if (!user) {
      return res.status(404).send({ message: 'User not found!' })
    }

    res.send(user)
  } catch (error) {
    res.status(500).send(error)
  }
})

app.post('/users', async (req, res) => {
  const userDoc = new UserModel(req.body)

  try {
    await userDoc.save()
    res.status(201).send(userDoc)
  } catch (error) {
    es.status(400).send(error)
  }
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
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await TaskModel.find()
    res.send(tasks)
  } catch (error) {
    res.status(500).send()
  }
})

app.get('/tasks/:id', async (req, res) => {
  const { id } = req.params

  try {
    const task = await TaskModel.findById(id)

    if (!task) {
      return res.status(404).send({ message: 'Task not found!' })
    }

    res.send(task)
  } catch (error) {
    res.status(500).send(error)
  }
})

app.post('/tasks', async (req, res) => {
  const taskDoc = new TaskModel(req.body)

  try {
    await taskDoc.save()
    res.status(201).send(taskDoc)
  } catch (error) {
    res.status(400).send(error)
  }
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

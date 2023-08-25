const express = require('express')
const TaskModel = require('../models/task')
const router = express.Router()

router.get('/tasks', async (req, res) => {
  try {
    const tasks = await TaskModel.find()
    res.send(tasks)
  } catch (error) {
    res.status(500).send()
  }
})

router.get('/tasks/:id', async (req, res) => {
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

router.post('/tasks', async (req, res) => {
  const taskDoc = new TaskModel(req.body)

  try {
    await taskDoc.save()
    res.status(201).send(taskDoc)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params

  try {
    const task = await TaskModel.findByIdAndDelete(id)

    if (!task) {
      return res.status(404).send({ message: 'Task not found!' })
    }

    res.send(task)
  } catch (error) {
    res.status(500).send(error)
  }
})

router.patch('/tasks/:id', async (req, res) => {
  const { id } = req.params
  const updates = Object.keys(req.body)
  const allowedUpdates = ['description', 'completed']
  const isValidUpdate = updates.every((update) =>
    allowedUpdates.includes(update)
  )

  if (!isValidUpdate) {
    return res.status(400).send({ message: 'Update not allowed!' })
  }

  try {
    const task = await TaskModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    })

    if (!task) {
      return res.status(404).send({ message: 'Task not found!' })
    }

    res.send(task)
  } catch (error) {
    res.status(400).send(error)
  }
})

module.exports = router

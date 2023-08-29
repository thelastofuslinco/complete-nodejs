const express = require('express')
const TaskModel = require('../models/task')
const auth = require('../middlewares/auth')
const router = express.Router()

router.get('/tasks', auth, async (req, res) => {
  const { limit, skip, completed, sortBy } = req.query
  const query = { owner: req.user._id }
  const options = { limit, skip }
  const sort = {}

  if (completed) query.completed = completed
  if (sortBy) {
    const parts = sortBy.split(':')
    sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
  }

  try {
    const data = await TaskModel.find(query).setOptions({ ...options, sort })

    res.send({ data })
  } catch (error) {
    res.status(500).send()
  }
})

router.get('/tasks/:id', auth, async (req, res) => {
  const _id = req.params.id

  try {
    const task = await TaskModel.findOne({ _id, owner: req.user._id })

    if (!task) {
      return res.status(404).send({ message: 'Task not found!' })
    }

    await task.populate('owner')
    res.send(task)
  } catch (error) {
    res.status(500).send(error)
  }
})

router.post('/tasks', auth, async (req, res) => {
  const taskDoc = new TaskModel({ ...req.body, owner: req.user._id })

  try {
    await taskDoc.save()
    await taskDoc.populate('owner')
    res.status(201).send(taskDoc)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.delete('/tasks/:id', auth, async (req, res) => {
  const _id = req.params.id

  try {
    const task = await TaskModel.findByIdAndDelete({ _id, owner: req.user._id })

    if (!task) {
      return res.status(404).send({ message: 'Task not found!' })
    }

    res.send(task)
  } catch (error) {
    res.status(500).send(error)
  }
})

router.patch('/tasks/:id', auth, async (req, res) => {
  const _id = req.params.id
  const updates = Object.keys(req.body)
  const allowedUpdates = ['description', 'completed']
  const isValidUpdate = updates.every((update) =>
    allowedUpdates.includes(update)
  )

  if (!isValidUpdate) {
    return res.status(400).send({ message: 'Update not allowed!' })
  }

  try {
    const task = await TaskModel.findOne({ _id, owner: req.user._id })

    if (!task) {
      return res.status(404).send({ message: 'Task not found!' })
    }

    updates.forEach((update) => (task[update] = req.body[update]))
    await task.save()

    res.send(task)
  } catch (error) {
    res.status(400).send(error)
  }
})

module.exports = router

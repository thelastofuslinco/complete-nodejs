const UserModel = require('../models/user')
const express = require('express')
const router = express.Router()

router.get('/users', async (req, res) => {
  try {
    const users = await UserModel.find()

    res.send(users)
  } catch (error) {
    res.status(500).send()
  }
})

router.get('/users/:id', async (req, res) => {
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

router.post('/users', async (req, res) => {
  const userDoc = new UserModel(req.body)

  try {
    await userDoc.save()
    res.status(201).send(userDoc)
  } catch (error) {
    es.status(400).send(error)
  }
})

router.delete('/users/:id', async (req, res) => {
  const { id } = req.params

  try {
    const user = await UserModel.findByIdAndDelete(id)

    if (!user) {
      return res.status(404).send({ message: 'User not found!' })
    }

    res.send(user)
  } catch (error) {
    res.status(500).send(error)
  }
})

router.patch('/users/:id', async (req, res) => {
  const { id } = req.params
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'email', 'password', 'age']
  const isValidUpdate = updates.every((update) =>
    allowedUpdates.includes(update)
  )

  if (!isValidUpdate) {
    return res.status(404).send({ message: 'Update not allowed!' })
  }

  try {
    const user = await UserModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    })

    if (!user) {
      return res.status(404).send({ message: 'User not found!' })
    }

    res.send(user)
  } catch (error) {
    res.status(400).send(error)
  }
})

module.exports = router

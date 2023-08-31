const express = require('express')
const UserModel = require('../models/user')
const { sendWelcomeEmail } = require('../emails/accounts')
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
  const user = new UserModel(req.body)

  try {
    await user.save()
    sendWelcomeEmail(user.email, user.name)
    const token = await user.generateAuthToken()
    res.status(201).send({ user, token })
  } catch (error) {
    res.status(400).send(error)
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
    return res.status(400).send({ message: 'Update not allowed!' })
  }

  try {
    const user = await UserModel.findById(id)

    updates.forEach((update) => (user[update] = req.body[update]))
    await user.save()

    if (!user) {
      return res.status(404).send({ message: 'User not found!' })
    }

    res.send(user)
  } catch (error) {
    res.status(400).send(error)
  }
})

module.exports = router

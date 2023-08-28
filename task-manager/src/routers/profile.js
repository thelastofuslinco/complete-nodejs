const express = require('express')
const auth = require('../middlewares/auth')
const router = express.Router()

router.get('/profile', auth, async (req, res) => {
  res.send(req.user)
})

router.delete('/profile', auth, async (req, res) => {
  try {
    await req.user.deleteOne()

    res.send(req.user)
  } catch (error) {
    res.status(500).send(error)
  }
})

router.patch('/profile', auth, async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'email', 'password', 'age']
  const isValidUpdate = updates.every((update) =>
    allowedUpdates.includes(update)
  )

  if (!isValidUpdate) {
    return res.status(400).send({ message: 'Update not allowed!' })
  }

  try {
    const user = req.user

    updates.forEach((update) => (user[update] = req.body[update]))
    await user.save()

    res.send(user)
  } catch (error) {
    res.status(400).send(error)
  }
})

module.exports = router

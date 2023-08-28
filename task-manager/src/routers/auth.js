const express = require('express')
const auth = require('../middlewares/auth')
const UserModel = require('../models/user')
const router = express.Router()

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await UserModel.findByCredentials(email, password)

    const token = await user.generateAuthToken()

    res.send({ user, token })
  } catch (error) {
    res.status(400).send(error)
  }
})

router.post('/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    )
    await req.user.save()

    res.send()
  } catch (error) {
    res.status(500).send(error)
  }
})

router.post('/logout/all', auth, async (req, res) => {
  try {
    req.user.tokens = []
    await req.user.save()

    res.send()
  } catch (error) {
    res.status(500).send(error)
  }
})

module.exports = router

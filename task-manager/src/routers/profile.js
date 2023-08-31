const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const auth = require('../middlewares/auth')
const UserModel = require('../models/user')
const { sendCancelationEmail } = require('../emails/accounts')

const router = express.Router()
const upload = multer({
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, callback) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return callback(new Error('Please upload a image'))
    }

    callback(undefined, true)
  }
})

router.get('/profile', auth, async (req, res) => {
  res.send(req.user)
})

router.delete('/profile', auth, async (req, res) => {
  try {
    await req.user.deleteOne()
    sendCancelationEmail(req.user.email, req.user.name)
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

router.post(
  '/profile/avatar',
  auth,
  upload.single('avatar'),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize(250).png().toBuffer()
    req.user.avatar = buffer
    req.user.avatar = await req.user.save()
    res.send()
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message })
  }
)

router.delete('/profile/avatar', auth, async (req, res) => {
  req.user.avatar = undefined
  await req.user.save()
  res.send()
})

router.get('/profile/:id/avatar', async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id)
    if (!user?.avatar) throw new Error()

    res.set('Content-Type', 'image/jpg').send(user.avatar)
  } catch (error) {
    res.status(400).send()
  }
  res.send()
})

module.exports = router

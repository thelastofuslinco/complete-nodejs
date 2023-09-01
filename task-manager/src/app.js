const express = require('express')
require('./database/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const authRouter = require('./routers/auth')
const profileRouter = require('./routers/profile')

const app = express()
app.use(express.json(), userRouter, profileRouter, taskRouter, authRouter)

module.exports = app

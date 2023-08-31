const express = require('express')
require('./database/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const authRouter = require('./routers/auth')
const profileRouter = require('./routers/profile')

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(userRouter, profileRouter, taskRouter, authRouter)

app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})

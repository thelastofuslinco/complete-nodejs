const mongoose = require('mongoose')

const dbName = process.env.DB_NAME
const uri = process.env.MONGODB_URL
mongoose.connect(uri, { dbName })

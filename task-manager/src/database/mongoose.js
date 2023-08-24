const mongoose = require('mongoose')

const dbName = 'task-manager-api'
const uri = 'mongodb://localhost:27017'
mongoose.connect(uri, { dbName })

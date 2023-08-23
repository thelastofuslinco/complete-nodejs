const mongodb = require('mongodb')

const uri = 'mongodb://localhost:27017'
const client = new mongodb.MongoClient(uri)
const databaseName = 'task-manager'

const run = async () => {
  try {
    const database = client.db(databaseName)
    const tasks = database.collection('tasks')
    const result = await tasks.updateMany(
      { completed: false },
      {
        $set: {
          completed: true
        }
      }
    )
    console.log(result)
  } finally {
    await client.close()
  }
}

run().catch(console.dir)

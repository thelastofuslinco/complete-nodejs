const { MongoClient, ObjectId } = require('mongodb')

const uri = 'mongodb://localhost:27017'
const databaseName = 'task-manager'
const client = new MongoClient(uri)

async function run() {
  const database = client.db(databaseName)
  const users = database.collection('users')

  users
    .find({})
    .toArray()
    .then(console.log)
    .finally(() => {
      client.close()
    })
}

run().catch(console.dir)

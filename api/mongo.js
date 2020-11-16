import assert from 'assert'
import mongodb from 'mongodb'
const MongoClient = mongodb

let mongo = null
let mastsCollection = null

MongoClient.connect(
  process.env.MONGO_CONNECTION_STRING,
  {
    useUnifiedTopology: true,
    poolSize: 10
  },
  (error, connectionPool) => {
    assert.equal(null, error)

    const database = connectionPool.db(process.env.MONGO_DB_NAME)
    mongo = connectionPool
    mastsCollection = database.collection(process.env.MONGO_COLLECTION_NAME)
  }
)

export { mongo, mastsCollection }

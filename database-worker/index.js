import dotenv from 'dotenv-flow'
import fs from 'fs'
import mongodb from 'mongodb'
import parseAndConvertData from './parse-and-convert.js'

dotenv.config()
const MongoClient = mongodb

async function main () {
  const client = await MongoClient
    .connect(process.env.MONGO_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
    .catch(error => console.error(error))
  const database = client.db(process.env.MONGO_DB_NAME)
  const collection = database.collection(process.env.MONGO_COLLECTION_NAME)

  const filesInMastDir = fs.readdirSync(process.env.MASTS_DIR)
  for (const file of filesInMastDir) {
    const isFileRelevant = file.includes('WEB')
    if (!isFileRelevant) continue

    const dataFromFile = fs.readFileSync(`${process.env.MASTS_DIR}/${file}`)
    await collection.insertMany(
      JSON.parse(dataFromFile)
        .map(dataPoint => parseAndConvertData(dataPoint))
        .filter(parsedObject => !!parsedObject)
    )
  }

  process.exit()
}

main()

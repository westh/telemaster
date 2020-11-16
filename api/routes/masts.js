import { Router } from 'express'
import mongodb from 'mongodb'
import asyncHandler from '../middleware/async-handler.js'
import { mastsCollection } from '../mongo.js'

const router = Router()

router.get('/', asyncHandler(async (req, res) => {
  const { operators, frequencies, technologies, short } = req.query

  const isShortResultSet = !!short

  const operatorValues = operators && req.query.operators.split(',')
  const technologyValues = technologies && req.query.technologies.split(',')
  const frequencyValues = frequencies && req.query.frequencies.split(',')

  const query = {
    ...(operatorValues && { operator: { $in: operatorValues } }),
    ...(technologyValues && { technology: { $in: technologyValues } }),
    ...(frequencyValues && { frequency: { $in: frequencyValues } })
  }

  const result = isShortResultSet
    ? await mastsCollection
        .find(query)
        .project({
          _id: 1,
          latitude: 1,
          longitude: 1,
          operator: 1
        })
        .toArray()
    : await mastsCollection
        .find(query)
        .toArray()

  return res.status(200).json(result)
}))

router.get('/:id', asyncHandler(async (req, res) => {
  const { id } = req.params
  const result = await mastsCollection.findOne(new mongodb.ObjectId(id))
  return res.status(200).json(result)
}))

export default router

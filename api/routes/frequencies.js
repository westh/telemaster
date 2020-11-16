import { Router } from 'express'
import asyncHandler from '../middleware/async-handler.js'
import { mastsCollection } from '../mongo.js'

const router = Router()

router.get('/', asyncHandler(async (_req, res) => {
  const frequencies = await mastsCollection.distinct('frequency')
  return res.json(frequencies)
}))

export default router

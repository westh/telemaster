import { Router } from 'express'
import asyncHandler from '../middleware/async-handler.js'
import { mastsCollection } from '../mongo.js'

const router = Router()

router.get('/', asyncHandler(async (_req, res) => {
  const operators = await mastsCollection.distinct('operator')
  return res.json(operators)
}))

export default router

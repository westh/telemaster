import { Router } from 'express'
import asyncHandler from '../middleware/async-handler.js'
import { mastsCollection } from '../mongo.js'

const router = Router()

router.get('/', asyncHandler(async (_req, res) => {
  const technologies = await mastsCollection.distinct('technology')
  return res.json(technologies)
}))

export default router

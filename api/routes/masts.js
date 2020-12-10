import { json, Router } from 'express'
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

router.post('/list', json(), asyncHandler(async (req, res) => {
  console.log(req.body)
  const { ids } = req.body

  const masts = await mastsCollection
    .find({
      _id: {
        $in: ids.map(id => new mongodb.ObjectId(id))
      }
    })
    .toArray()

  const result = {
    tdc: getAggregation(masts.filter(mast => mast.operator.includes('TDC'))),
    teliaTelenor: getAggregation(masts.filter(mast => mast.operator.includes('Telia'))),
    three: getAggregation(masts.filter(mast => mast.operator.includes('3')))
  }

  return res.status(200).json(result)
}))

router.get('/:id', asyncHandler(async (req, res) => {
  const { id } = req.params
  const result = await mastsCollection.findOne(new mongodb.ObjectId(id))
  return res.status(200).json(result)
}))

function getAggregation(masts) {
  const streets = {}
  masts.forEach((mast) => {
    const street = streets[mast.street]

    if (street) {
      const technologyForMast = street.technologies[mast.technology]
      // Init the technology key if it doesn't exist with an empty set
      if (!technologyForMast) {
        street.technologies[mast.technology] = new Set()
      }
      street.technologies[mast.technology].add(mast.frequency)
      return
    }
    streets[mast.street] = {
      operator: mast.operator,
      technologies: { [mast.technology]: new Set([mast.frequency]) },
      city: mast.city,
      postalCode: mast.postalCode,
      street: mast.street,
      latitude: mast.latitude?.toFixed(4),
      longitude: mast.longitude?.toFixed(4),
    }
  })

  return Object.values(streets).map((aggregatedMast) => {
    const technologies = {}

    Object.keys(aggregatedMast.technologies).forEach(
      (technology) =>
        (technologies[technology] = [
          ...aggregatedMast.technologies[technology],
        ])
    )

    return {
      ...aggregatedMast,
      technologies,
    }
  })
}


export default router

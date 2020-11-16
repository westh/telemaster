import cors from 'cors'
import express from 'express'
import rateLimit from 'express-rate-limit'
import morgan from 'morgan'
import routesFrequencies from './routes/frequencies.js'
import routesMasts from './routes/masts.js'
import routesOperators from './routes/operators.js'
import routesTechnologies from './routes/technologies.js'

const isDevelopment = process.env.NODE_ENV === 'development'
const app = express()

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 100 // limit each IP to 100 requests per windowMs
})

// global middleware
app.use(limiter)
app.use(morgan(isDevelopment ? 'dev' : 'combined'))
app.use(cors())

// routes
app.use('/frequencies', routesFrequencies)
app.use('/technologies', routesTechnologies)
app.use('/operators', routesOperators)
app.use('/masts', routesMasts)

// global error message
app.use((error, _req, res, _next) => {
  console.error(error)
  return res.status(500).json({ message: '🚨 Internal server error' })
})

// global not found message
app.use((_req, res) => res.status(404).json({ message: '👋 Yo buddy, there is nothing here' }))

// server listener
app.listen(process.env.PORT, () => console.log(`🐝🐝🐝 App started on port ${process.env.PORT}`))

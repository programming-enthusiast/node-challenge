import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import compression from 'compression'
import mongoose from 'mongoose'

import usersRouter from './services/users/index.js'
import fieldsRouter from './services/fields/index.js'
import listingsRouter from './services/listings/index.js'
import listingServicesRouter from './services/listingServices/index.js'

if (process.env.NODE_ENV !== 'production') {
  dotenv.config()
}

const DB_URI = process.env.DB_URI
const startDbPromise = async () => mongoose.connect(
  DB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  err => err && console.warn({err})
)

const app = express()
const PORT = process.env.PORT || 8080

const handleError = (err, req, res, _) => {
  console.log(`${req.method} ${req.url}`, err)
  res.status(err.status || 500).send(err.message || 'Internal Server Error')
}

const createApp = () => {
  // logging middleware
  app.use(morgan('dev'))

  // enable all cors requests
  app.use(cors())

  // body parsing middleware
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  // compression middleware
  app.use(compression())

  // services
  app.use('/users', usersRouter)
  app.use('/fields', fieldsRouter)
  app.use('/listings', listingsRouter)
  app.use('/listingServices', listingServicesRouter)

  app.get('/', (req, res) => {
    res.send('The sedulous bear ate the antelope!')
  })

  app.use(handleError)
}

const startListening = () => {
  // start listening (and create a 'server' object representing our server)
  app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`))
}

const start = async () => {
  console.log('Opening connection to MongoDB...')
  await startDbPromise()
  console.log('MongoDB connection opened')
  createApp()
  startListening()
}

start()

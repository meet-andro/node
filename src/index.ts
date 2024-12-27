import compression from 'compression'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import { createServer } from 'http'
import morgan from 'morgan'
import path from 'path'
import { CORSOPTION } from './constant'
import mongodb from './db'
import routeConfig from './lib/routeConfig'
import { errorHandler, errorLogger, notFound } from './middleware/helper'

import './globals'

const envFile = process.env.NODE_ENV === 'development' ? '.env.development' : '.env'

if (dotenv.config({ path: path.resolve(process.cwd(), envFile) }).error) {
  console.error('No environment variable found')
  process.exit(1)
}

mongodb.initialize()

const app = express()

const httpServer = createServer(app)

httpServer.listen(process.env.PORT, () => global.log.info(`Spinning on ${process.env.PORT}`))

app.use(compression())
app.use(cors(CORSOPTION))

app.use(routeConfig)

app.use(
  morgan('dev', {
    skip: (req) => req.path === '/health' || req.path === '/favicon.ico'
  })
)

app.use(express.static(path.join(__dirname, 'public')))

app.get('/health', (req, res) => {
  res.reply({ code: 200, message: 'Service is up and running!' }, { timestamp: new Date() })
})

app.use('*', notFound)

app.use(errorLogger)

app.use(errorHandler)

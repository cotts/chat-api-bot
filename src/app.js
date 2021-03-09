import express, { Router } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import api from './api'
import verifyToken from './lib/verifyToken'

const router = Router().use('/api', api)

export default express()
  .use(cors())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use(verifyToken)
  .use(router)

import { Router } from 'express'
import * as controller from './user.controller'

export default Router()
  .post('/', controller.create)
  .post('/login', controller.getUser)

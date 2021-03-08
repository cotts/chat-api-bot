import { Router } from 'express'
import * as controller from './message.controller'

export default Router().get('/:roomId', controller.fetchAll)

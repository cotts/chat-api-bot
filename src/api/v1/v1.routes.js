import { Router } from 'express'
import message from './message'
import user from './user'

export default Router().use('/message', message).use('/user', user)

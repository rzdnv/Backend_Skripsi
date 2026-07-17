import { Router } from 'express'
import { getAllUser } from './users.controller'

const route = Router()

route.get('/', getAllUser)

export default route    
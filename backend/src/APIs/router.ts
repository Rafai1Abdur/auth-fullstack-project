import { Router } from 'express'
import controller from './controller'
import rateLimiter from '../middlewares/rateLimiter'
import { getMe } from './user/authentication/authentication.controller'
import authenticate from '../middlewares/authenticate'

const router = Router()

router.route('/self').get(rateLimiter, controller.self)
router.route('/health').get(controller.health)
router.get('/me', authenticate, getMe)

export default router

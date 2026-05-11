import { Router } from 'express'
import managementController from './management.controller'
import authenticate from '../../../middlewares/authenticate'
import { authorize } from '../../../middlewares/authorize'
import rateLimiter from '../../../middlewares/rateLimiter'
import { EUserRoles } from '../../../constant/users'

const router = Router()

router.route('/me').get(rateLimiter, authenticate, managementController.me)
router.route('/users').get(rateLimiter, authenticate, authorize(EUserRoles.ADMIN), managementController.getAllUsers)
router.route('/users/role').patch(rateLimiter, authenticate, authorize(EUserRoles.ADMIN), managementController.updateUserRole)

export default router
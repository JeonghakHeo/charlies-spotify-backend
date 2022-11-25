import express from 'express'
import {
  requestUserAuthorization,
  requestAccessToken,
} from '../controllers/authController.js'

const router = express.Router()

router.route('/login').get(requestUserAuthorization)
router.route('/callback').get(requestAccessToken)

export default router

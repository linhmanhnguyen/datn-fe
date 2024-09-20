import express from 'express'
import { CONSTANTS } from '../../../utils/constants.js'

import adminAPIs from './admin.js'

const router = express.Router()

router.use('/', adminAPIs);

export default router



import express from 'express'
import {CONSTANTS} from '../../utils/constants.js'

import siteAPIs from './sites/index.js'

const router = express.Router()

router.use('/sites',  siteAPIs)

export default router


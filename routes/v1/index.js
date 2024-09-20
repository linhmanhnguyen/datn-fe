
import express from 'express'

import siteAPIs from './sites/index.js'
import adminAPIs from './dashboard/index.js'

const router = express.Router()

router.use('/sites',  siteAPIs)
router.use('/admin', adminAPIs)

export default router


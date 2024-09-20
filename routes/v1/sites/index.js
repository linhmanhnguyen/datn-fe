import express from 'express'
import { CONSTANTS } from '../../../utils/constants.js'

import authAPIs from './auth/index.js';
import homeAPIs from './home/index.js';

import myCartAPIs from './mycart/index.js';
import buyProductAPIs from './buyProduct/index.js';
import featuresAPIs from './features/features.js';

const router = express.Router()

router.use(CONSTANTS.API_AUTH, authAPIs);

router.use('/', homeAPIs)

router.use('/', buyProductAPIs);
router.use('/', featuresAPIs);
router.use('/', myCartAPIs);

export default router


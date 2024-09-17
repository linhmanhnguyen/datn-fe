import express from 'express'
import features from './features.js';

const router = express.Router()

router.use("/", features)

export default router


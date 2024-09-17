import express from 'express'
import auth from './user-route.js';

const router = express.Router()

router.use("/", auth)

export default router


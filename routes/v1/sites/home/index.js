import express from 'express'
import home from './home-route.js';

const router = express.Router()

router.use("/", home)

export default router


import express from 'express'
import betuflpage from './betuflpage.js';

const router = express.Router()

router.use("/", betuflpage)

export default router


import express from 'express'
import mycart from './my-cart.js';

const router = express.Router()

router.use("/", mycart);

export default router


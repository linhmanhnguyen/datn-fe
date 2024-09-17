import express from 'express'
import buyProduct from './buy-product.js';

const router = express.Router()

router.use("/", buyProduct)

export default router


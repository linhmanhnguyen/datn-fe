import express from "express";

import { CONSTANTS } from "../../../../utils/constants.js";
import buyProductController from "../../../../controller/buyProduct.js";

const buyProductRouter = express.Router();


//  render màn hình thông tin chi tiết sản phẩm

buyProductRouter.get(
  CONSTANTS.API_BUY_PRODUCT,
  buyProductController.buyProductRender
);


export default buyProductRouter;

import express from "express";

import { CONSTANTS } from "../../../../utils/constants.js";
import myCartController from "../../../../controller/mycart.js";

const myCartRouter = express.Router();

// Render Home page
myCartRouter.get(
  CONSTANTS.API_MY_CART,
  myCartController.myCartRender
);


export default myCartRouter;

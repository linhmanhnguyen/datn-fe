import express from "express";

import { CONSTANTS } from "../../../../utils/constants.js";
import homeController from "../../../../controller/homeController.js";

const homeRouter = express.Router();

// Render Home page
homeRouter.get(
  CONSTANTS.API_TRANG_CHU,
  homeController.homeRender
);


export default homeRouter;

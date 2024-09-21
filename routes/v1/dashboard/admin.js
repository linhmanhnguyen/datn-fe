import express from "express";

import { CONSTANTS } from "../../../utils/constants.js";
import DashboardController from '../../../controller/dashboardController.js';

const adminRouter = express.Router();

adminRouter.get(
  "/orders",
  DashboardController.dashboardRender
);

adminRouter.get(
  "/products",
  DashboardController.productRender
);



export default adminRouter;

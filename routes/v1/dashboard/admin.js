import express from "express";

import { CONSTANTS } from "../../../utils/constants.js";
import DashboardController from '../../../controller/dashboardController.js';

const adminRouter = express.Router();

adminRouter.get(
  CONSTANTS.API_TRANG_CHU,
  DashboardController.dashboardRender
);


export default adminRouter;

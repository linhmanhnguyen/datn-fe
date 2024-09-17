import express from "express";

import { CONSTANTS } from "../../../../utils/constants.js";
import featureController from "../../../../controller/features.js";

const featureRouter = express.Router();

// Render Home page
featureRouter.get(
  CONSTANTS.API_FEATURES,
  featureController.featuresRender
);


export default featureRouter;

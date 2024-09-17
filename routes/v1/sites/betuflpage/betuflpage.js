import express from "express";

import { CONSTANTS } from "../../../../utils/constants.js";
import betuflpageController from "../../../../controller/betuflpage.js";

const betuflpageRouter = express.Router();

// Render Home page
betuflpageRouter.get(
  CONSTANTS.API_BETUFL_PAGE,
  betuflpageController.betuflpageRender
);


export default betuflpageRouter;

import express from "express";

import { CONSTANTS } from "../../../../utils/constants.js";
import AuthController from '../../../../controller/authController.js';

const authenticationRouter = express.Router();

// API đăng nhập
authenticationRouter.post(
  CONSTANTS.API_AUTH_LOGIN,
  // apiKeyAuthenticate(),
  // validateRequest(CONSTANTS.VALIDATOR_AUTH_API),
  AuthController.login
);

// Render Login page
authenticationRouter.get(
  CONSTANTS.API_AUTH_LOGIN,
  // apiKeyAuthenticate(),
  // validateRequest(CONSTANTS.VALIDATOR_AUTH_API),
  AuthController.renderLogin
);


export default authenticationRouter;

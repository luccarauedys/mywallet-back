import express from "express";

import { signIn, signUp } from "./../controllers/authController.js";

import {
  validateUserSchema,
  validateNewUserSchema,
} from "../middlewares/schemasValidationMiddleware.js";

const authRouter = express.Router();

authRouter.post("/signin", validateUserSchema, signIn);
authRouter.post("/signup", validateNewUserSchema, signUp);

export default authRouter;

import express from "express";
import { loginController, registerController } from "../Controller/AuthController.js";

const authRouter = express.Router(); 

authRouter.post("/register", registerController);

authRouter.post("/login", loginController);

export default authRouter;

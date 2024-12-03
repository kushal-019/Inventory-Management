import express from "express";
import { loginController, registerController } from "../Controller/AuthController.js";

const Authrouter = express.Router();

Authrouter.post("/register", registerController);

Authrouter.post("/login", loginController);

export default Authrouter;

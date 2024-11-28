import express from "express";
import { registerController } from "../Controller/registerController.js";
import { loginController } from "../Controller/loginController.js";

const Authrouter = express.Router();

Authrouter.post("/register", registerController);

Authrouter.post("/login", loginController);

export default Authrouter;

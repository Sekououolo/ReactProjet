import express from "express";
import AuthController from "../controllers/AuthController.js";

const authRouter = express.Router();
const authController = new AuthController();

authRouter.post("/connexion", authController.connexion);
authRouter.post("/inscription", authController.inscription);

export default authRouter;
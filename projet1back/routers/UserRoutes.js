import express from "express"
import UserController from "../controllers/UserController.js"

const userRouter = express.Router()
const userController = new UserController()

userRouter.put("/:id", userController.updateUser)
userRouter.get("/:id", userController.getUser)

export default userRouter
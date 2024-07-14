import { Router } from "express";
import UserController from "../Controller/UserController.js";

const userRouter = Router();
const userController = new UserController;

userRouter.post('/register',(req,res) => userController.registerUser(req,res));

export default userRouter;
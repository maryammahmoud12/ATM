import { Router } from "express";
import * as UC from "./user.controller.js";
const userRouter = Router();

userRouter.post("/signup", UC.Register);
userRouter.post("/signin", UC.login);

export default userRouter;

import { Router } from "express";
import { createSessionController } from "../controllers/login.controllers";

const loginRouter: Router = Router();

loginRouter.post("", createSessionController);

export default loginRouter;

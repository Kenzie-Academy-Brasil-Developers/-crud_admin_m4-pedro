import { Request, Response, Router } from "express";
import {
  createUsersController,
  listUsersController,
  retrieveUsersControllers,
} from "../controllers/user.controllers";
import ensureEmailNotExists from "../middlewares/ensureEmailNotExists.middleware";

const userRoutes: Router = Router();

userRoutes.post("", ensureEmailNotExists, createUsersController);
userRoutes.get("", listUsersController);
userRoutes.get("/:id", retrieveUsersControllers);

export default userRoutes;

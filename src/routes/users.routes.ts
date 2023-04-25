import { Request, Response, Router } from "express";
import {
  createUsersController,
  listUsersController,
  retrieveUsersController,
  updateUsersController,
} from "../controllers/user.controllers";
import ensureEmailNotExistsMiddleware from "../middlewares/ensureEmailNotExists.middleware";
import ensureUserExistsMiddleware from "../middlewares/ensureUserExists.middleware";
import ensureBodyIsValidMiddleware from "../middlewares/ensureBodyIsValid.middleware";
import { requestUserSchema, updateUserSchema } from "../schemas/users.schemas";

const userRoutes: Router = Router();

userRoutes.post(
  "",
  ensureBodyIsValidMiddleware(requestUserSchema),
  ensureEmailNotExistsMiddleware,
  createUsersController
);
userRoutes.get("", listUsersController);
userRoutes.get("/:id", ensureUserExistsMiddleware, retrieveUsersController);
userRoutes.patch(
  "/:id",
  ensureBodyIsValidMiddleware(updateUserSchema),
  ensureUserExistsMiddleware,
  updateUsersController
);

export default userRoutes;

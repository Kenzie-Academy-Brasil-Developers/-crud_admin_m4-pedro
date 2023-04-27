import { Request, Response, Router } from "express";
import {
  createUsersController,
  deactivateUserController,
  listUserProfileController,
  listUsersController,
  recoverUsersController,
  updateUsersController,
} from "../controllers/user.controllers";
import ensureEmailNotExistsMiddleware from "../middlewares/ensureEmailNotExists.middleware";
import ensureUserExistsMiddleware from "../middlewares/ensureUserExists.middleware";
import ensureBodyIsValidMiddleware from "../middlewares/ensureBodyIsValid.middleware";
import { requestUserSchema, updateUserSchema } from "../schemas/users.schemas";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middleware";

import ensureUserIsOwnerMiddleware from "../middlewares/ensureUserIsOwner.middleware";
import deleteUsersService from "../services/users/deleteUsers.service";
import ensureUserIsActiveMiddleware from "../middlewares/ensureUserIsActivity.middleware";
import ensureUserIsAdminMiddleware from "../middlewares/ensureUserIsAdmin.middleware";

const userRoutes: Router = Router();

userRoutes.post(
  "",
  ensureBodyIsValidMiddleware(requestUserSchema),
  ensureEmailNotExistsMiddleware,
  createUsersController
);

userRoutes.get(
  "",
  ensureTokenIsValidMiddleware,
  ensureUserIsOwnerMiddleware,
  listUsersController
);

userRoutes.get(
  "/profile",
  ensureTokenIsValidMiddleware,
  listUserProfileController
);

userRoutes.patch(
  "/:id",
  ensureUserExistsMiddleware,
  ensureTokenIsValidMiddleware,
  ensureUserIsOwnerMiddleware,
  ensureBodyIsValidMiddleware(updateUserSchema),
  updateUsersController
);

userRoutes.delete(
  "/:id",
  ensureTokenIsValidMiddleware,
  ensureUserExistsMiddleware,
  ensureUserIsOwnerMiddleware,
  deactivateUserController
);

userRoutes.put(
  "/:id/recover",
  ensureTokenIsValidMiddleware,
  ensureUserIsAdminMiddleware,
  ensureUserIsActiveMiddleware,
  recoverUsersController
);

export default userRoutes;

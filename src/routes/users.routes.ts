import { Request, Response, Router } from "express";
import {
  createUsersController,
  listUsersController,
  putUsersControler,
  retrieveUsersController,
  updateUsersController,
} from "../controllers/user.controllers";
import ensureEmailNotExistsMiddleware from "../middlewares/ensureEmailNotExists.middleware";
import ensureUserExistsMiddleware from "../middlewares/ensureUserExists.middleware";
import ensureBodyIsValidMiddleware from "../middlewares/ensureBodyIsValid.middleware";
import { requestUserSchema, updateUserSchema } from "../schemas/users.schemas";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middleware";
import ensureUserIsAdminMiddleware from "../middlewares/ensureUserIsAdmin.middleware";
import ensureUserIsOwnerMiddleware from "../middlewares/ensureUserIsOwner.middleware";
import deleteUsersService from "../services/users/deleteUsers.service";

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
  ensureUserIsAdminMiddleware,
  listUsersController
);

userRoutes.get(
  "/:id",
  ensureUserExistsMiddleware,
  ensureTokenIsValidMiddleware,
  retrieveUsersController
);

userRoutes.patch(
  "/:id",
  ensureUserExistsMiddleware,
  ensureTokenIsValidMiddleware,
  ensureUserIsAdminMiddleware,
  ensureUserIsOwnerMiddleware,
  ensureBodyIsValidMiddleware(updateUserSchema),
  updateUsersController
);

userRoutes.delete(
  "/:id",
  ensureUserExistsMiddleware,
  ensureTokenIsValidMiddleware,
  ensureUserIsAdminMiddleware,
  deleteUsersService
);

userRoutes.put(
  "/:id/recover",
  ensureUserExistsMiddleware,
  ensureTokenIsValidMiddleware,
  putUsersControler
);

export default userRoutes;

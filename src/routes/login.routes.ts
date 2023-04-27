import { Router } from "express";
import { createSessionController } from "../controllers/login.controllers";
import ensureBodyIsValidMiddleware from "../middlewares/ensureBodyIsValid.middleware";
import { requestLoginSchema } from "../schemas/login.schemas";

const loginRouter: Router = Router();

loginRouter.post(
  "",
  ensureBodyIsValidMiddleware(requestLoginSchema),
  createSessionController
);

export default loginRouter;

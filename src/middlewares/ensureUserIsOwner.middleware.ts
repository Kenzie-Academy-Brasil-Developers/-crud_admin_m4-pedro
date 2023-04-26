import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";

const ensureUserIsOwnerMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { id, admin } = res.locals;

  if (id !== req.params.id && !admin) {
    throw new AppError("Insufficient Permission", 403);
  }
  return next();
};

export default ensureUserIsOwnerMiddleware;

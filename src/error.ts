import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

class AppError extends Error {
  statusCode: number;

  constructor(messsage: string, statusCode: number = 400) {
    super(messsage);
    this.statusCode = statusCode;
  }
}

const handleErrors = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      message: err.message,
    });
  }

  if (err instanceof ZodError) {
    return res.status(400).json(err.flatten().fieldErrors);
  }

  console.log(err);

  return res.status(500).json({
    message: "internal server error",
  });
};

export { AppError, handleErrors };

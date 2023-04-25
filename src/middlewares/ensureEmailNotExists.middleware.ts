import { NextFunction, Request, Response } from "express";
import { QueryResult } from "pg";
import format from "pg-format";
import { TUserResponse } from "../interfaces/user";
import { client } from "../database";
import { AppError } from "../error";

const ensureEmailNotExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { email }: { email: string } = req.body;
  const queryString: string = format(
    `
        SELECT 
          * 
        FROM
          users
        WHERE
          email = (%L);
        `,
    email
  );

  const queryResult: QueryResult = await client.query(queryString);

  if (queryResult.rowCount > 0) {
    throw new AppError("E-mail already registered", 409);
  }

  return next();
};

export default ensureEmailNotExistsMiddleware;

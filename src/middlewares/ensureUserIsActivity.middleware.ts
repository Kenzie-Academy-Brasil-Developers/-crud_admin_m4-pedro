import { Request, Response, NextFunction } from "express";
import { QueryResult } from "pg";
import { client } from "../database";
import { AppError } from "../error";
import format from "pg-format";
import { TUserResponse } from "../interfaces/user.interfaces";

const ensureUserIsActiveMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const id: number = parseInt(req.params.id);

  const queryString: string = format(
    `
    SELECT
      *
    FROM
      users
    WHERE
      id = %L;
   `,
    id
  );

  const queryResult: QueryResult<TUserResponse> = await client.query(
    queryString
  );

  const user = queryResult.rows[0];

  if (user.active === true) {
    throw new AppError("User already active", 400);
  }

  return next();
};

export default ensureUserIsActiveMiddleware;

import { NextFunction, Request, Response } from "express";
import { QueryResult } from "pg";
import format from "pg-format";
import { TUserResponse } from "../interfaces/user";
import { client } from "../database";

const ensureEmailNotExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
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
      throw new Error("E-mail already registered");
    }

    return next();
  } catch (error: any) {
    console.log(error);
    return res.status(409).json({
      message: error.message,
    });
  }
};

export default ensureEmailNotExists;

import format from "pg-format";
import jwt from "jsonwebtoken";
import "dotenv/config";
import {
  TLoginRequest,
  TLoginResponse,
} from "../../interfaces/login.interfaces";
import { QueryResult } from "pg";
import { client } from "../../database";
import { TUser } from "../../interfaces/user.interfaces";
import { AppError } from "../../error";
import * as bcrypt from "bcryptjs";

const createSessionService = async (
  payload: TLoginRequest
): Promise<TLoginResponse> => {
  const queryString: string = format(
    `
    SELECT * FROM users
    WHERE email = %L;
    `,
    payload.email
  );

  const queryResult: QueryResult<TUser> = await client.query(queryString);

  if (queryResult.rowCount === 0) {
    throw new AppError("Wrong email/password", 401);
  }

  const user = queryResult.rows[0];

  const comparePassword: boolean = await bcrypt.compare(
    payload.password,
    user.password
  );

  if (!comparePassword) {
    throw new AppError("Wrong email/password", 401);
  }

  const token: string = jwt.sign(
    {
      admin: user.admin,
    },
    String(process.env.SECRET_KEY!),
    {
      expiresIn: "24h",
      subject: user.id.toString(),
    }
  );

  return { token };
};

export default createSessionService;

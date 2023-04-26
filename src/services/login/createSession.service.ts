import format from "pg-format";
import {
  TLoginRequest,
  TLoginResponse,
} from "../../interfaces/login.interfaces";
import { QueryResult } from "pg";
import { client } from "../../database";
import { TUser } from "../../interfaces/user.interfaces";
import { AppError } from "../../error";
import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const createSessionService = async (
  payload: TLoginRequest
): Promise<TLoginResponse> => {
  const email: string = payload.email;

  const queryString: string = format(
    `
    SELECT * FROM users
    WHERE email = %L;
    `,
    email
  );

  const queryResult: QueryResult<TUser> = await client.query(queryString);

  if (queryResult.rowCount === 0) {
    throw new AppError("Wrong email/password");
  }

  const user = queryResult.rows[0];

  const comparePassword: boolean = await bcrypt.compare(
    payload.password,
    user.password
  );

  if (!comparePassword) {
    throw new AppError("Wrong email/password");
  }

  const token: string = jwt.sign(
    {
      admin: user.admin,
    },
    "secret key",
    {
      expiresIn: "1d",
      subject: user.id.toString(),
    }
  );

  return { token };
};

export default createSessionService;

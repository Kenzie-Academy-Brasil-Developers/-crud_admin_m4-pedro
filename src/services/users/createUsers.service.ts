import format from "pg-format";
import {
  TUser,
  TUserCreate,
  TUserRequest,
  TUserResponse,
} from "../../interfaces/user.interfaces";
import { QueryResult } from "pg";
import { client } from "../../database";
import { responseUserSchema } from "../../schemas/users.schemas";
import * as bcrypt from "bcryptjs";

const createUsersService = async (
  payload: TUserRequest
): Promise<TUserResponse> => {
  payload.password = await bcrypt.hash(payload.password, 10);

  const queryString: string = format(
    `
    INSERT INTO 
       users (%I)
    VALUES
       (%L)
    RETURNING 
        *;      
    `,
    Object.keys(payload),
    Object.values(payload)
  );

  const queryResult: QueryResult<TUser> = await client.query(queryString);

  const newUser = responseUserSchema.parse(queryResult.rows[0]);

  return newUser;
};

export default createUsersService;

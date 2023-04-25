import format from "pg-format";
import {
  TUser,
  TUserCreate,
  TUserRequest,
  TUserResponse,
} from "../../interfaces/user";
import { QueryResult } from "pg";
import { client } from "../../database";
import { responseUserSchema } from "../../schemas/users.schemas";

const createUsersService = async (
  payload: TUserRequest
): Promise<TUserResponse> => {
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

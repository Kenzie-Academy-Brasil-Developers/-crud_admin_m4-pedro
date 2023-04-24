import format from "pg-format";
import { TUser, TUserCreate, TUserResponse } from "../../interfaces/user";
import { QueryResult } from "pg";
import { client } from "../../database";

const createUsersService = async (
  payload: TUserCreate
): Promise<TUserResponse> => {
  const queryString: string = format(
    `
    INSERTO INTO 
       users(I%)
    VALUES
       (%L)
    RETURNING 
       "id" "name" "email" "admin" "active";      
    `,
    Object.keys(payload),
    Object.values(payload)
  );

  const queryResult: QueryResult<TUser> = await client.query(queryString);

  const newUser: TUser = queryResult.rows[0];

  return newUser;
};

export default createUsersService;

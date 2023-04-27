import { QueryConfig, QueryResult } from "pg";
import { client } from "../../database";
import { TUserResponse, TUser } from "../../interfaces/user.interfaces";
import { responseUserSchema } from "../../schemas/users.schemas";
import format from "pg-format";

const recoverUserService = async (userId: number): Promise<TUserResponse> => {
  const id: number = userId;

  const queryString: string = format(
    `
  UPDATE
    users
  SET
    active = true
  WHERE   
    id = %L
  AND 
    active = false
  RETURNING *;
    `,
    id
  );

  const queryResult: QueryResult<TUser> = await client.query(queryString);

  const user = queryResult.rows[0];

  return responseUserSchema.parse(user);
};

export default recoverUserService;

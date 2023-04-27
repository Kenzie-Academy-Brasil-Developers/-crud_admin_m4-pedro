import { QueryResult } from "pg";
import { client } from "../../database";
import format from "pg-format";
import { TUser, TUserResponse } from "../../interfaces/user.interfaces";

const deleteUsersService = async (
  userId: number,
  token: number
): Promise<TUserResponse> => {
  const id: number = userId;
  const userToken: number = token;

  if (userToken !== id) {
    throw new Error("Insufficient Permission");
  }

  const queryString: string = format(
    `
  UPDATE
    users
  SET
    active = false
  WHERE
    id = %L
  AND
    active = true
  RETURNING *;
  `,
    id
  );

  const queryResult: QueryResult<TUser> = await client.query(queryString);

  const user = queryResult.rows[0];

  return user;
};

export default deleteUsersService;

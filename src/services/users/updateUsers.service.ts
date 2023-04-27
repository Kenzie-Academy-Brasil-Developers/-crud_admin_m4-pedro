import format from "pg-format";
import {
  TUserRequest,
  TUserResponse,
  TUserUpdateRequest,
} from "../../interfaces/user.interfaces";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../../database";
import { responseUserSchema } from "../../schemas/users.schemas";

const updateUsersService = async (
  userId: number,
  payload: TUserUpdateRequest
): Promise<TUserResponse> => {
  const id: number = userId;
  const queryString: string = format(
    `
    UPDATE users
      SET(%I) = ROW(%L)
    WHERE 
      id = %L
    RETURNING
      *;
    `,
    Object.keys(payload),
    Object.values(payload),
    id
  );

  const queryResult: QueryResult<TUserResponse> = await client.query(
    queryString
  );

  const updatedUser = responseUserSchema.parse(queryResult.rows[0]);

  return updatedUser;
};

export default updateUsersService;

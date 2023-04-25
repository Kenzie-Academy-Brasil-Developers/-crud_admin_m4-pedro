import format from "pg-format";
import {
  TUserRequest,
  TUserResponse,
  TUserUpdateRequest,
} from "../../interfaces/user";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../../database";
import { responseUserSchema } from "../../schemas/users.schemas";

const updateUsersService = async (
  userId: number,
  payload: TUserUpdateRequest
): Promise<TUserResponse> => {
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
    Object.values(payload)
  );

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [userId],
  };

  const queryResult: QueryResult<TUserResponse> = await client.query(
    queryConfig
  );

  const updatedUser = responseUserSchema.parse(queryResult.rows[0]);

  return updatedUser;
};

export default updateUsersService;

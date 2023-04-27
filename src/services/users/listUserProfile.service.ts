import format from "pg-format";
import { client } from "../../database";
import { QueryResult } from "pg";
import { TUserResponse } from "../../interfaces/user.interfaces";

const listUserProfileService = async (
  userId: number
): Promise<TUserResponse> => {
  const id: number = userId;
  console.log(id);
  const queryString: string = format(
    `
  SELECT
   "id", "name", "email", "admin", "active" 
  FROM 
    users
  WHERE id= %L;
  `,
    id
  );

  const queryResult: QueryResult<TUserResponse> = await client.query(
    queryString
  );

  return queryResult.rows[0];
};

export default listUserProfileService;

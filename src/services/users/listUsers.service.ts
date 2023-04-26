import { QueryResult } from "pg";
import {
  TUser,
  TUserRequest,
  TUserResponse,
} from "../../interfaces/user.interfaces";
import { client } from "../../database";

const listUsersService = async (): Promise<Array<TUserResponse>> => {
  const queryString: string = `
  SELECT
    "id" "name" "email" "admin" "active";  
  FROM 
    users;  
  `;

  const queryResult: QueryResult<TUserResponse> = await client.query(
    queryString
  );

  return queryResult.rows;
};

export default listUsersService;

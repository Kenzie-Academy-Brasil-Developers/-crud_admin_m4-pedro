import { QueryResult } from "pg";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { TUserResponse } from "../../interfaces/user.interfaces";
import { client } from "../../database";
import { AppError } from "../../error";

const listUsersService = async (): Promise<Array<TUserResponse>> => {
  const queryString: string = `
  SELECT
    "id",
    "name",
    "email",
    "admin",
    "active"  
  FROM 
    users;  
  `;

  const queryResult: QueryResult<TUserResponse> = await client.query(
    queryString
  );

  return queryResult.rows;
};

export default listUsersService;

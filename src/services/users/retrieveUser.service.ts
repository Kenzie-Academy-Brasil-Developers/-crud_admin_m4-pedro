import { format } from "path";
import { TUser } from "../../interfaces/user";
import { QueryResult } from "pg";
import { client } from "../../database";

const retrieveUsersServices = async (userId: number): Promise<TUser> => {
  const id: number = userId;

  const queryString: string = `
    SELECT * FROM users
    WHERE id = %L;
    `;

  const queryResult: QueryResult<TUser> = await client.query(queryString);

  return queryResult.rows[0];
};

export default retrieveUsersServices;

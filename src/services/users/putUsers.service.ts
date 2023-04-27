import format from "pg-format";
import { client } from "../../database";

const putUsersRecoverService = async (userId: number): Promise<void> => {
  const id: number = userId;
  const queryString: string = format(
    `
    UPDATE
      users
    SET
      active = true
    WHERE
      id = %L
    RETURNING 
      "id", "name", "email", "admin", "active"
    `,
    id
  );

  await client.query(queryString);
};

export default putUsersRecoverService;

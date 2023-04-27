import format from "pg-format";
import { client } from "../../database";

const deleteUsersService = async (userId: number): Promise<void> => {
  const id: number = userId;
  const queryString: string = format(
    `
    UPDATE 
      users
    SET
      active = false
    WHERE
      id = %L;
    `,
    id
  );
  await client.query(queryString);
};

export default deleteUsersService;

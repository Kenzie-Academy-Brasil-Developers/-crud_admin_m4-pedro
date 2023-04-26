import { TUser, TUserResponse } from "../../interfaces/user.interfaces";
import { responseUserSchema } from "../../schemas/users.schemas";

const retrieveUsersService = async (user: TUser): Promise<TUserResponse> => {
  const userResponse = responseUserSchema.parse(user);
  return user;
};

export default retrieveUsersService;

import { z } from "zod";
import {
  updateUserSchema,
  requestUserSchema,
  responseUserSchema,
  userSchema,
} from "../schemas/users.schemas";

type TUser = z.infer<typeof userSchema>;

type TUserRequest = z.infer<typeof requestUserSchema>;

type TUserUpdateRequest = z.infer<typeof updateUserSchema>;

type TUserResponse = z.infer<typeof responseUserSchema>;

type TUserCreate = Omit<TUser, "id"> & {
  password: string;
};

type TUserWrongCreate = {
  name: number;
  email: string;
};

type TUserLogin = Omit<TUserCreate, "admin" | "active" | "name">;

export {
  TUserCreate,
  TUserWrongCreate,
  TUserLogin,
  TUser,
  TUserRequest,
  TUserResponse,
  TUserUpdateRequest,
};

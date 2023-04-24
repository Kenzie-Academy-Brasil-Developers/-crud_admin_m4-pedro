type TUser = {
  id: number;
  name: string;
  email: string;
  password: string;
  admin: boolean;
  active: boolean;
};

type TUserRequest = Omit<TUser, "id">;

type TUserResponse = Omit<TUser, "password">;

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
};

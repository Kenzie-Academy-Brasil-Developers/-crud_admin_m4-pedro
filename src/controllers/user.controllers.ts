import { Request, Response } from "express";
import createUsersService from "../services/users/createUsers.service";
import {
  TUserRequest,
  TUserResponse,
  TUserUpdateRequest,
} from "../interfaces/user.interfaces";
import listUsersService from "../services/users/listUsers.service";
import updateUsersService from "../services/users/updateUsers.service";
import deleteUsersService from "../services/users/deleteUsers.service";
import putUsersRecoverService from "../services/users/recoverUsers.service";
import listUserProfileService from "../services/users/listUserProfile.service";
import recoverUsersService from "../services/users/recoverUsers.service";

const createUsersController = async (
  req: Request,
  resp: Response
): Promise<Response> => {
  const payload: TUserRequest = req.body;
  const newUser: TUserResponse = await createUsersService(payload);

  return resp.status(201).json(newUser);
};

const listUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const users = await listUsersService();

  return res.json(users);
};

const listUserProfileController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: number = Number(res.locals.id);

  const payload: TUserResponse = await listUserProfileService(userId);

  return res.status(200).json(payload);
};

const updateUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: number = Number(req.params.id);
  const payload: TUserUpdateRequest = req.body;

  const updatedUser = await updateUsersService(userId, payload);

  return res.json(updatedUser);
};

const deactivateUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: number = parseInt(req.params.id);
  const userToken: number = res.locals.id;

  const userData = await deleteUsersService(userId, userToken);

  return res.status(204).json(userData);
};

const recoverUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: number = Number(req.params.id);

  const user: TUserResponse = await recoverUsersService(userId);

  return res.status(200).json(user);
};

export {
  createUsersController,
  listUsersController,
  updateUsersController,
  listUserProfileController,
  recoverUsersController,
  deactivateUserController,
};

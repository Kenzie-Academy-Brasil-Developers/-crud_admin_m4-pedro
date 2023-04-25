import { Request, Response } from "express";
import createUsersService from "../services/users/createUsers.service";
import {
  TUserRequest,
  TUserResponse,
  TUserUpdateRequest,
} from "../interfaces/user";
import listUsersService from "../services/users/listUsers.service";
import retrieveUsersServices from "../services/users/retrieveUser.service";
import updateUsersService from "../services/users/updateUsers.service";

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
  const users = listUsersService();

  return res.json(users);
};

const retrieveUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const user = await retrieveUsersServices(res.locals.user);

  return res.json(user);
};

const updateUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: number = parseInt(req.params.id);
  const userData: TUserUpdateRequest = req.body;

  const updatedUser = await updateUsersService(userId, userData);

  return res.json(updatedUser);
};

export {
  createUsersController,
  listUsersController,
  retrieveUsersController,
  updateUsersController,
};

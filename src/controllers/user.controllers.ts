import { Request, Response } from "express";
import createUsersService from "../services/users/createUsers.service";
import { TUserRequest, TUserResponse } from "../interfaces/user";
import listUsersService from "../services/users/listUsers.service";
import retrieveUsersServices from "../services/users/retrieveUser.service";

const createUsersController = async (
  req: Request,
  resp: Response
): Promise<Response> => {
  try {
    const payload: TUserRequest = req.body;
    const newUser: TUserResponse = await createUsersService(payload);

    return resp.status(201).json(newUser);
  } catch (error: any) {
    return resp.status(400).json({
      message: error.message,
    });
  }
};

const listUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const users = listUsersService();

  return res.json(users);
};

const retrieveUsersControllers = async (
  req: Request,
  resp: Response
): Promise<Response> => {
  try {
    const userId: number = Number(req.params.id);

    const user = await retrieveUsersServices(userId);

    return resp.status(200).json(user);
  } catch (error: any) {
    return resp.status(400).json({
      message: error.message,
    });
  }
};

export { createUsersController, listUsersController, retrieveUsersControllers };

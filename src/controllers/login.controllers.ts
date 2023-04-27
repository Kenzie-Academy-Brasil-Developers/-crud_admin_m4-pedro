import { Request, Response } from "express";
import { TLoginRequest, TLoginResponse } from "../interfaces/login.interfaces";
import createSessionService from "../services/login/createSession.service";

const createSessionController = async (
  req: Request,
  resp: Response
): Promise<Response> => {
  const payload: TLoginRequest = req.body;
  const token: TLoginResponse = await createSessionService(payload);

  return resp.status(200).json(token);
};

export { createSessionController };

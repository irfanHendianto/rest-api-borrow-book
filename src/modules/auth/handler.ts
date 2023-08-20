import { AuthRequest } from "@/interface/auth";
import { comparePassword, hashPassword } from "@/lib/helpers";
import { addUserService, generateToken, getUserByEmailService } from "@/repository/auth";
import { sendApiResponse, sendApiError } from "@/utilitas/response.handler";
import { Request, Response, request } from "express";

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body as AuthRequest;
    const isExists = await getUserByEmailService(email);
    if (!isExists) throw new Error();
 
    const validatePassword = comparePassword(password, isExists.password);
    if (!validatePassword) throw new Error();
    const token = await generateToken({ 
      user_id: isExists.id,
      email: isExists.email,
      name: isExists.name
    });

    return sendApiResponse(res, 200, "succeess", { token: token });
  } catch (error) {
    const message =  error?.message ? error.message : "Invalid Email Or Password"
    return sendApiError(res, 500,message);
  }
};

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const existsEmail = await getUserByEmailService(req.body.email);
    if(existsEmail) throw new Error("Email Already Register");

    await addUserService(req.body)

    return sendApiResponse(res, 200, "succeess", { token: "asdasd" });
  } catch (error) {
    const message =  error?.message ? error.message : "Internal Server Error"
    return sendApiError(res, 500,message);
  }
};

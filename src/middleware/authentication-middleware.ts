import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { sendApiError } from "@/utilitas/response.handler";
import config from "@/constants/config";

declare module "express" {
  interface Request {
    user?: {
      user_id?: string;
      emai?: string;
      name?: string;
    };
  }
}

export const authenticationAndDecode = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token = null;
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.query && req.query.token) {
      token = req.query.token;
    }

    if (!token) throw new Error("Token Not Provided");

    jwt.verify(
      token,
       config.SECRET_KEY,
      (err: jwt.VerifyErrors | null, decoded: any) => {
        if (err) {
          throw new Error("Unauthenticated User");
        }
        req.user = decoded;
        next();
      }
    );
  } catch (error) {
    const message =  error?.message ? error.message : "Unauthenticated User"
    return sendApiError(res, 401,message);
  }
};

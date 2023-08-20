import config from "@/constants/config";
import { UserSchema } from "@/interface/users";
import prisma from "@/lib/db-connection";
import { hashPassword } from "@/lib/helpers";
import jwt from "jsonwebtoken";

export async function generateToken(payload: UserSchema): Promise<string> {
  const token = jwt.sign(payload, config.SECRET_KEY, {
    expiresIn: 86400,
    algorithm: "HS256",
  });
  return token;
}
export async function getUserByEmailService(email: string) {
  const user = await prisma.users.findUnique({
    where: { email },
  });
  return user;
}

export async function addUserService(payload: UserSchema): Promise<any> {
  const { name, email, password } = payload;

  const user = await prisma.users.create({
    data: {
      name: name,
      email: email,
      password: hashPassword(password),
    },
  });
  return user;
}

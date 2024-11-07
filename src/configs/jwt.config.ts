import { SignOptions } from "jsonwebtoken";
import { JWT_SECRET,JWT_EXPIRES_IN } from "./envs";

const jwtSignOptions: SignOptions = {
  expiresIn: JWT_EXPIRES_IN,
};

export const jwtConfig = {
  options: jwtSignOptions,
  secret : JWT_SECRET,
};
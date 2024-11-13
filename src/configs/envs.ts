import dotenv from "dotenv";

dotenv.config();

export const NODE_ENV = process.env.NODE_ENV ?? "development";
export const PORT = process.env.PORT ?? "8000";
export const MORGAN_FORMAT = NODE_ENV === "production" ? "common" : "dev";
export const CORS_ALLOW_ORIGINS = process.env.ALLOW_ORIGINS_URLS || "*";
export const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1d";
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "1d";
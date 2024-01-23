import dotenv from "dotenv";
dotenv.config();

// Enviroment
export const ENVIRONMENT = process.env.ENVIRONMENT;

// public domain
export const NEXT_PUBLIC_DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;

// POSTGRESQL
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_NAME = process.env.DB_NAME;
export const DB_PORT = process.env.DB_PORT
  ? parseInt(process.env.DB_PORT)
  : 5432;
export const DATABASE_URL = process.env.DATABASE_URL;
export const DB_HOST = process.env.DB_HOST;
export const DB_URL = process.env.DB_URL;

import { Pool } from "pg";
import { Sequelize } from "sequelize";
import {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_NAME,
  DB_PORT,
  ENVIRONMENT,
  DB_URL,
} from "@/lib/config";
import Post from "../Models/PostModel";

const pool = new Pool({
  database: DB_NAME,
  user: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: DB_PORT,
});

const sequelize = new Sequelize(
  DB_URL !== undefined
    ? DB_URL
    : `${ENVIRONMENT === "PRODUCTION" ? "postgresql" : "postgres"}://${
        DB_USER ?? ""
      }:${DB_PASSWORD ?? ""}@${DB_HOST ?? ""}:${DB_PORT ?? ""}/${
        DB_NAME ?? ""
      }`,
  {
    // ... more pg settings
    dialect: "postgres",
    dialectModule: require("pg"),
  }
);

// Config and exposr models
const PostModel = Post(sequelize);

export { sequelize, pool, PostModel };

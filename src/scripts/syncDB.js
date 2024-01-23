// scripts/syncDB.ts
const { DataTypes, Sequelize } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

// POSTGRESQL
const ENVIRONMENT = process.env.ENVIRONMENT;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const DB_PORT = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432;
const DB_HOST = process.env.DB_HOST;
const DB_URL = process.env.DB_URL;

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
  }
);

// Create models
function Post(sequelize) {
  return sequelize.define(
    "Post",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        unique: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    { timestamps: true }
  );
}

const PostModel = Post(sequelize);

async function syncDB() {
  try {
    await sequelize.authenticate();

    // Migrations
    await sequelize.sync({ alter: true });

    console.log("Database connected and synchronized successfully");
  } catch (error) {
    console.error("Error syncing database:", error);
    throw new Error("Failed to synchronize the database");
  } finally {
    try {
      await sequelize.close();
      console.log("Database connection closed");
    } catch (closeError) {
      console.error("Error closing database connection:", closeError);
    }
  }
}

// Start the function to sync the database
syncDB();

// export model to seed
module.exports = { sequelize, PostModel };

require("dotenv").config();
const fs = require("fs");
const path = require("path");

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./src/database/db.sqlite",
    },
    migrations: {
      directory: "./src/database/migrations",
    },
    useNullAsDefault: true,
  },

  test: {
    client: "sqlite3",
    connection: {
      filename: "./src/database/test.sqlite",
    },
    migrations: {
      directory: "./src/database/migrations",
    },
    useNullAsDefault: true,
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  production: {
    client: "pg",
    connection: {
      host: String(process.env.DB_HOST),
      port: Number(process.env.DB_PORT),
      database: String(process.env.DB_NAME),
      user: String(process.env.DB_USER),
      password: String(process.env.DB_PASSWORD),
      ssl: {
        rejectUnauthorized: false,
        ca: fs
          .readFileSync(
            path.resolve(__dirname, "ssl_cert", "postgres", "root.crt")
          )
          .toString(),
        key: fs
          .readFileSync(
            path.resolve(__dirname, "ssl_cert", "postgres", "client.key")
          )
          .toString(),
        cert: fs
          .readFileSync(
            path.resolve(__dirname, "ssl_cert", "postgres", "client.crt")
          )
          .toString(),
        minVersion: String(process.env.DB_SSL_TLS_VER),
      },
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: path.resolve(__dirname, "src", "database", "migrations"),
    },
    debug: false,
  },
};

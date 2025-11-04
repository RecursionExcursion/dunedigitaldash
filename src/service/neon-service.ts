"use server";

import { neon } from "@neondatabase/serverless";
import { NewTaskrUser, TaskrUser } from "../lib/Taskr";

const DB_CONN = process.env.DATABASE_DEV;

if (!DB_CONN) {
  throw Error("No DB Connection string set");
}

const sql = neon(DB_CONN);
const tableName = "taskr_users";

const pgCryptoExt = `CREATE EXTENSION IF NOT EXISTS pgcrypto`;

const createTableQuery = `
    CREATE TABLE IF NOT EXISTS ${sql.unsafe(tableName)} (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        tasks JSONB COMPRESSION pglz DEFAULT '[]'::jsonb
    );
`;

const createTable = async () => {
  const qrys = [pgCryptoExt, createTableQuery];
  await sql.transaction((txn) => qrys.map((q) => txn`${sql.unsafe(q)}`));
  return [];
};

const createUser = async (user: NewTaskrUser) => {
  const res = await sql`INSERT into ${sql.unsafe(
    tableName
  )} (username, password, tasks)
    VALUES (
        ${user.username},
        ${user.password},
        ${JSON.stringify(user.tasks)}::jsonb
    )`;
  return res as TaskrUser[];
};

const getUser = async (id: string) => {
  const res = await sql`SELECT * 
  FROM ${sql.unsafe(tableName)} 
  WHERE id = ${id}`;
  return res as TaskrUser[];
};

const updateUser = async (user: TaskrUser) => {
  const res = await sql`UPDATE ${sql.unsafe(tableName)}
    SET username = EXCLUDED.username,
        password = EXCLUDED.password,
        tasks = EXCLUDED.tasks
    WHERE id = ${user.id}
    RETURNING *;
    `;
  return res as TaskrUser[];
};

const deleteUserById = async (id: string) => {
  const res = await sql`DELETE 
    FROM ${sql.unsafe(tableName)} 
    WHERE id = ${id}
    RETURNING id`;
  return res as { id: string }[];
};

const neonQueires = {
  createTable,
  createUser,
  updateUser,
  getUser,
  deleteUserById,
};
export { neonQueires as neonQueries  };

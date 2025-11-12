import { neon } from "@neondatabase/serverless";
import { NewTaskrUser, TaskrTask, TaskrUser } from "../../lib/taskr-types";

const tableName = "taskr_users";
const userFieldsNoPw = "id, username, tasks";

export async function taskrRepo(connectionString: string) {
  const sql = neon(connectionString);

  //create table
  await (async () => {
    const qrys = [pgCryptoExt, createTableQuery];
    await sql.transaction((tx) => qrys.map((q) => tx`${sql.query(q)}`));
    return [];
  })();

  return {
    async createUser(user: NewTaskrUser) {
      const res = await sql.query(
        `INSERT into ${tableName} (username, password, tasks) 
        VALUES ($1, $2, $3::jsonb)
        RETURNING ${userFieldsNoPw};`,
        [user.username, user.password, JSON.stringify(user.tasks)]
      );
      return res as TaskrUser[];
    },

    async getUserById(id: string) {
      const res = await sql.query(`SELECT * FROM ${tableName} WHERE id = $1`, [
        id,
      ]);
      return res as TaskrUser[];
    },

    async getUserByUsername(name: string) {
      const res = await sql.query(
        `SELECT ${userFieldsNoPw} FROM ${tableName} WHERE username = $1`,
        [name]
      );
      return res as TaskrUser[];
    },

    async updateUser(user: TaskrUser) {
      const res = await sql.query(
        `UPDATE ${tableName}
        SET username = $2,
          password = $3,
          tasks = $4
        WHERE id = $1
        RETURNING *;`,
        [user.id, user.username, user.password, JSON.stringify(user.tasks)]
      );
      return res as TaskrUser[];
    },

    async updateUserTasks(userId: string, tasks: TaskrTask[]) {
      const res = await sql.query(
        `UPDATE ${tableName}
        SET tasks = $2
        WHERE id = $1
        RETURNING ${userFieldsNoPw};`,
        [userId, JSON.stringify(tasks)]
      );
      return res as TaskrUser[];
    },

    async deleteUserById(id: string) {
      const res = await sql.query(
        `DELETE FROM ${tableName} WHERE id = $1 RETURNING id;`,
        [id]
      );
      return res as { id: string }[];
    },
  };
}

const pgCryptoExt = `CREATE EXTENSION IF NOT EXISTS pgcrypto`;

const createTableQuery = `
CREATE TABLE IF NOT EXISTS ${tableName} (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  tasks JSONB COMPRESSION pglz DEFAULT '[]'::jsonb
  );
  `;

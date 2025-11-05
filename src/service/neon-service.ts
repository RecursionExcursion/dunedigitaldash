import { neon } from "@neondatabase/serverless";
import { NewTaskrUser, TaskrUser } from "../lib/Taskr";

const tableName = "taskr_users";

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
        RETURNING *;
        `,
        [user.username, user.password, JSON.stringify(user.tasks)]
      );
      return res as TaskrUser[];
    },

    async getUserById(id: string) {
      const res = await sql.query(`SELECT * FROM $1 WHERE id = $2`, [
        tableName,
        id,
      ]);
      return res as TaskrUser[];
    },
    
    async getUserByUsername(name: string) {
      const res = await sql.query(`SELECT * FROM $1 WHERE username = $2`, [
        tableName,
        name,
      ]);
      return res as TaskrUser[];
    },

    async updateUser(user: TaskrUser) {
      const res = await sql.query(
        `UPDATE $1
        SET username = EXCLUDED.username,
          password = EXCLUDED.password,
          tasks = EXCLUDED.tasks
        WHERE id = $2
        RETURNING *;`,
        [tableName, user.id]
      );
      return res as TaskrUser[];
    },

    async deleteUserById(id: string) {
      const res = await sql.query(
        `DELETE FROM $1 WHERE id = $2 RETURNING id;`,
        [tableName, id]
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

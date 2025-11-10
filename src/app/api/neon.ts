import { taskrRepo } from "./neon-service";

const DB_CONN = process.env.DATABASE_DEV;

if (!DB_CONN) {
  throw Error("No DB Connection string set");
}

const neonQueries = await taskrRepo(DB_CONN);

export default neonQueries;

"use server";

import { Taskr, TaskrRepo } from "../lib/Taskr";
import { neonQueries } from "./neon-service";

const repo: TaskrRepo = {
  async createUser(user) {
    const res = await neonQueries.createUser(user);
    return res[0] ?? null;
  },
  async readUser(id) {
    const res = await neonQueries.getUser(id);
    return res[0] ?? null;
  },
  async updateUser(user) {
    const res = await neonQueries.updateUser(user);
    return res[0] ?? null;
  },
  async deleteUser(id) {
    const res = await neonQueries.deleteUserById(id);
    return !!res[0];
  },
};

neonQueries.createTable();

const taskr = new Taskr(repo);

export default taskr;

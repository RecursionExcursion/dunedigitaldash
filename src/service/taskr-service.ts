"use server";

import { hashString } from "../lib/crypto";
import { serviceResponse, TaskrService } from "../lib/taskr";
import { setCookie } from "./cookie-service";
import { createToken } from "./jwt-service";
import { taskrRepo } from "./neon-service";
import { v4 as uuidv4 } from "uuid";

const DB_CONN = process.env.DATABASE_DEV;

if (!DB_CONN) {
  throw Error("No DB Connection string set");
}

const neonQueries = await taskrRepo(DB_CONN);

const taskrService: TaskrService = {
  async login(un, pw) {
    //create token

    const res = await neonQueries.getUserByUsername(un);

    //user not found or bad password
    if (!res[0] || (await hashString(pw)) !== res[0].password) {
      return serviceResponse(false, "Invalid credientials");
    }

    const user = res[0];

    const token = await createToken({
      sub: user.id,
      name: user.username,
      iss: "DuneDigitalDash",
    });

    await setCookie("user-session", token, 60 * 60 * 24 * 7); //7 days

    return serviceResponse(true, "");
  },

  async createUser(user) {
    user.password = await hashString(user.password);
    try {
      const res = await neonQueries.createUser(user);
      return serviceResponse(!!res[0], "", res[0]);
    } catch (err) {
      if (err && typeof err === "object" && "code" in err) {
        if (err.code === 23505) {
          return serviceResponse(false, "Username already taken");
        }
      }
      return serviceResponse(false, "Could not create account!");
    }
  },

  async readUser(id) {
    const res = await neonQueries.getUserById(id);
    return serviceResponse(!!res[0], "", res[0]);
  },

  async updateUser(user) {
    const res = await neonQueries.updateUser(user);
    return serviceResponse(!!res[0], "", res[0]);
  },

  async deleteUser(id) {
    const res = await neonQueries.deleteUserById(id);
    return serviceResponse(!!res[0], "", res[0]);
  },

  async addTask(id, task) {
    let res = await neonQueries.getUserById(id);

    if (!res[0]) {
      return serviceResponse(false, "User not found");
    }

    const usr = res[0];
    usr.tasks.push({
      ...task,
      id: uuidv4(),
    });

    res = await neonQueries.updateUser(usr);

    return serviceResponse(true, "", res[0]);
  },
};

export const loginUser = taskrService.login;
export const getUser = taskrService.readUser;
export const updateUser = taskrService.updateUser;
export const createUser = taskrService.createUser;
export const addTask = taskrService.addTask;

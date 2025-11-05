"use server";

import { hashString } from "../lib/crypto";
import { generateToken } from "../lib/jwt";
import {
  serviceResponse,
  NewTaskrUser,
  TaskrService,
  TaskrUser,
} from "../lib/Taskr";
import { taskrRepo } from "./neon-service";

const DB_CONN = process.env.DATABASE_DEV;
const JWT_SECRET = process.env.JWT_SECRET;

if (!DB_CONN) {
  throw Error("No DB Connection string set");
}
if (!JWT_SECRET) {
  throw Error("No JWT SECRET set");
}

const neonQueries = await taskrRepo(DB_CONN);

const taskrService: TaskrService = {
  async login(un, pw) {
    //create token

    const res = await neonQueries.getUserByUsername(un);
    //user not found or bad password
    if (!res[0] || (await hashString(res[0].password)) !== pw) {
      return serviceResponse(false, "Invalid credientials");
    }

    const user = res[0];

    const token = await generateToken(
      {
        id: user.id,
        name: user.username,
      },
      JWT_SECRET,
      {
        exp: "2h",
      }
    );

    return serviceResponse(true, "", token);
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
};

export const loginUser = taskrService.login;
export const getUser = taskrService.readUser;
export const updateUser = taskrService.updateUser;
export const createUser = taskrService.createUser;

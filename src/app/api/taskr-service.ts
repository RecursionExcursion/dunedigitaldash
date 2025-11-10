import { hashString } from "../../lib/crypto";
import { v4 as uuidv4 } from "uuid";
import neonQueries from "./neon";
import {
  NewTaskrTask,
  NewTaskrUser,
  TaskrTask,
  TaskrUser,
} from "../../lib/taskr-types";

type ServiceResponse<T> = {
  code: number;
  msg: string;
  data: T;
  ok: () => boolean;
};

const serviceResponse = <T>(
  code?: number,
  msg?: string,
  data?: T
): ServiceResponse<T> => {
  return {
    code: code ?? 200,
    data: data ?? ({} as T),
    msg: msg ?? "",
    ok() {
      return this.code >= 200 && this.code < 300;
    },
  };
};

interface TaskrService {
  createUser: (user: NewTaskrUser) => Promise<ServiceResponse<TaskrUser>>;
  readUser: (id: string) => Promise<ServiceResponse<TaskrUser>>;
  updateUser: (user: TaskrUser) => Promise<ServiceResponse<TaskrUser>>;
  deleteUser: (id: string) => Promise<ServiceResponse<{ id: string }>>;
  addTask: (
    id: string,
    task: NewTaskrTask
  ) => Promise<ServiceResponse<TaskrUser>>;
  updateTasks: (
    userId: string,
    tasks: TaskrTask[]
  ) => Promise<ServiceResponse<TaskrUser>>;
  deleteTask: (
    userId: string,
    taskId: string
  ) => Promise<ServiceResponse<{ id: string }>>;
}

const taskrService: TaskrService = {
  async createUser(user) {
    user.password = await hashString(user.password);
    try {
      const res = await neonQueries.createUser(user);

      return !!res[0] ? serviceResponse(200, "", res[0]) : serviceResponse(500);
    } catch (err) {
      if (err && typeof err === "object" && "code" in err) {
        if (err.code === 23505) {
          return serviceResponse(400, "Username already taken");
        }
      }
      return serviceResponse(500, "Could not create account");
    }
  },

  async readUser(id) {
    const res = await neonQueries.getUserById(id);
    return !!res[0] ? serviceResponse(200, "", res[0]) : serviceResponse(404);
  },

  async updateUser(user) {
    const res = await neonQueries.updateUser(user);
    return !!res[0] ? serviceResponse(200, "", res[0]) : serviceResponse(404);
  },

  async deleteUser(id) {
    const res = await neonQueries.deleteUserById(id);
    return !!res[0] ? serviceResponse(200, "", res[0]) : serviceResponse(404);
  },

  async addTask(id, task) {
    if (!validateNewTask(task)) {
      return serviceResponse(400);
    }

    let res = await neonQueries.getUserById(id);

    if (!res[0]) {
      return serviceResponse(404);
    }

    const usr = res[0];
    usr.tasks.push({
      ...task,
      id: uuidv4(),
    });

    res = await neonQueries.updateUser(usr);

    return serviceResponse(200, "", res[0]);
  },

  async updateTasks(userId, tasks) {
    if (!tasks.some((t) => !validateTask(t))) {
      return serviceResponse(400);
    }
    const res = await neonQueries.updateUserTasks(userId, tasks);
    if (!res[0]) {
      return serviceResponse(404, "User not found");
    }
    return serviceResponse(200, "", res[0]);
  },

  async deleteTask(userId, taskId) {
    let res = await neonQueries.getUserById(userId);
    if (!res[0]) {
      return serviceResponse(404, "User not found");
    }
    const usr = res[0];

    res = await neonQueries.updateUserTasks(
      usr.id,
      usr.tasks.filter((t) => t.id !== taskId)
    );
    return serviceResponse(200, "", res[0]);
  },
};
export default taskrService;

function validateNewTask(task: NewTaskrTask) {
  const keys: (keyof NewTaskrTask)[] = ["title", "dueDate", "status"];
  return !keys.some((k) => !task[k]);
}
function validateTask(task: TaskrTask) {
  const keys: (keyof TaskrTask)[] = ["id", "title", "dueDate", "status"];
  return !keys.some((k) => !task[k]);
}

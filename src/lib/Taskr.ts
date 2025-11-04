export type TaskrUser = {
  id: string;
  username: string;
  password: string;
  tasks: TaskrTask[];
};
export type NewTaskrUser = Omit<TaskrUser, "id">;

export type TaskrTask = {
  id: string;
  title: string;
  details?: string;
  dueDate: number;
  status: number;
  imageKey?: string;
};

export interface TaskrRepo {
  createUser: (user: NewTaskrUser) => Promise<TaskrUser | null>;
  readUser: (id: string) => Promise<TaskrUser>;
  updateUser: (user: TaskrUser) => Promise<TaskrUser | null>;
  deleteUser: (id: string) => Promise<boolean>;
}

export class Taskr {
  #repo: TaskrRepo;

  constructor(repo: TaskrRepo) {
    this.#repo = repo;
  }

  async getUser(id: string): Promise<TaskrUser> {
    return await this.#repo.readUser(id);
  }

  async saveUser(user: TaskrUser): Promise<TaskrUser | null> {
    return await this.#repo.updateUser(user);
  }

  async createUser(newUser: NewTaskrUser): Promise<TaskrUser | null> {
    return await this.#repo.createUser(newUser);
  }
}

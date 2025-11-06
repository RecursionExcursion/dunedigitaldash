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

type ServiceResponse<T> = {
  ok: boolean;
  msg: string;
  data: T;
};

export const serviceResponse = <T>(
  ok: boolean,
  msg?: string,
  data?: T
): ServiceResponse<T> => {
  return {
    ok,
    data: data ?? ({} as T),
    msg: msg ?? "",
  };
};

export interface TaskrService {
  login: (un: string, pw: string) => Promise<ServiceResponse<string>>;
  createUser: (user: NewTaskrUser) => Promise<ServiceResponse<TaskrUser>>;
  readUser: (id: string) => Promise<ServiceResponse<TaskrUser>>;
  updateUser: (user: TaskrUser) => Promise<ServiceResponse<TaskrUser>>;
  deleteUser: (id: string) => Promise<ServiceResponse<{ id: string }>>;
  addTask: (
    id: string,
    task: Omit<TaskrTask, "id">
  ) => Promise<ServiceResponse<TaskrUser>>;
}

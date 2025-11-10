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
export type NewTaskrTask = Omit<TaskrTask, "id">;



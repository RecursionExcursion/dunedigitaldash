export type Task = {
  id: string;
  dueDate: number;
  title: string;
  details?: string;
  status: number;
  imageKey?: string;
};

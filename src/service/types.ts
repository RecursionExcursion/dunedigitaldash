import { TaskrUser } from "../lib/taskr-types";

export type ServiceResponse<T> = {
  ok: boolean;
  msg: string;
  data: T;
};

export const serviceResponse = <T>(
  ok?: boolean,
  msg?: string,
  data?: T
): ServiceResponse<T> => {
  return {
    ok: ok ?? true,
    data: data ?? ({} as T),
    msg: msg ?? "",
  };
};

export type UserResponse = Promise<ServiceResponse<TaskrUser>>;

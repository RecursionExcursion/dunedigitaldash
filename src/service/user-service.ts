import { TaskrUser } from "../lib/taskr-types";
import { getCookie } from "./cookie-service";

type ServiceResponse<T> = {
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

export async function login(
  username: string,
  password: string
): Promise<ServiceResponse<string>> {
  const res = await fetch("/api/login", {
    method: "POST",
    body: JSON.stringify({
      username,
      password,
    }),
  });

  return serviceResponse(res.ok);
}

export async function getUser(): Promise<ServiceResponse<TaskrUser>> {
  const token = await getCookie("user-session");

  const res = await fetch(`/api/user`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (res.ok) {
    const usr = (await res.json()) as TaskrUser;
    return serviceResponse(true, "", usr);
  }

  return serviceResponse(false);
}

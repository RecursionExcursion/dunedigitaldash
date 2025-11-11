import { TaskrUser } from "../lib/taskr-types";
import { getCookie } from "./cookie-service";
import { serviceResponse, ServiceResponse } from "./types";

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

export async function createUser(username: string, password: string) {
  const res = await fetch("/api/user", {
    method: "POST",
    body: JSON.stringify({
      username,
      password,
    }),
  });

  //TODO maybe login here?
  if (res.ok) {
    return serviceResponse(true);
  }
  return serviceResponse(false);
}

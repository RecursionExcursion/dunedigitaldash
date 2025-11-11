import { Task } from "../app/types";
import { NewTaskrTask, TaskrUser } from "../lib/taskr-types";
import { getCookie } from "./cookie-service";
import { serviceResponse, UserResponse } from "./types";

export async function addTask(newTask: NewTaskrTask): UserResponse {
  const token = await getCookie("user-session");

  const res = await fetch("/api/task", {
    method: "POST",
    body: JSON.stringify({ task: newTask }),
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (res.ok) {
    const usr = await res.json();
    return serviceResponse(true, "", usr);
  }
  return serviceResponse(false);
}

export async function updateTasks(tasks: Task[]): UserResponse {
  const token = await getCookie("user-session");

  const res = await fetch("/api/task", {
    method: "PUT",
    body: JSON.stringify({ tasks }),
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

export async function deleteTask(taskId: string): UserResponse {
  const token = await getCookie("user-session");
  const res = await fetch("/api/task", {
    method: "DELETE",
    body: JSON.stringify({ taskId }),
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (res.ok) {
    const usr = await res.json();
    return serviceResponse(true, "", usr);
  }
  return serviceResponse(false);
}

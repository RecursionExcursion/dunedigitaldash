"use server";

import { deleteCookie } from "./cookie-service";
import { redirect } from "next/navigation";

export async function logoutUser() {
  await deleteCookie("user-session");
  redirect("/login");
}

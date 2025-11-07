"use server";

import { cookies } from "next/headers";

export async function getCookie(key: string) {
  const cookieStore = await cookies();
  const session = cookieStore.get(key);
  return session?.value ?? null;
}

export async function setCookie(name: string, token: string, maxAge?: number) {
  const cookieStore = await cookies();

  cookieStore.set({
    name,
    value: token,
    httpOnly: true,
    secure: true,
    path: "/",
    maxAge: maxAge ?? 60 * 60 * 24 * 7, // 1 week
  });

  return { ok: true };
}

export async function deleteCookie(key: string) {
  const cookieStore = await cookies();
  return cookieStore.delete(key);
}

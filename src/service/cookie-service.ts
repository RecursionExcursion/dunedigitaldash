"use server"
 
import { cookies } from "next/headers";

type CookieKey = "user-session";

export async function getCookie(key: CookieKey) {
  const cookieStore = await cookies();
  const session = cookieStore.get(key);
  return session?.value ?? null;
}

export async function setCookie(
  key: CookieKey,
  token: string,
  maxAge?: number
) {
  const cookieStore = await cookies();

  cookieStore.set({
    name: key,
    value: token,
    httpOnly: true,
    secure: true,
    path: "/",
    maxAge: maxAge ?? 60 * 60 * 24 * 7, // 1 week
  });

  console.log("Cookie set");
  

  return { ok: true };
}

export async function deleteCookie(key: CookieKey) {
  const cookieStore = await cookies();
  return cookieStore.delete(key);
}

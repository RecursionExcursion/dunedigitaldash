"use server";

import { JWTPayload } from "jose";
import { generateToken, validateToken } from "../lib/jwt";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw Error("No JWT SECRET set");
}

export async function verifyToken(token: string) {
  try {
    return await validateToken(token, JWT_SECRET!);
  } catch {
    return null;
  }
}

export async function createToken(payload: JWTPayload) {
  return await generateToken(payload, JWT_SECRET!, {
    exp: "7s",
  });
}

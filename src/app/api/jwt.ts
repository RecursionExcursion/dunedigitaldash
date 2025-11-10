import { JWTPayload, SignJWT, jwtVerify } from "jose";

export const generateToken = async (
  payload: JWTPayload,
  secret: string,
  opts?: {
    exp: string;
  }
) => {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(opts?.exp ?? "2h")
    .sign(new TextEncoder().encode(secret));
};

export const validateToken = (token: string, secret: string) => {
  try {
    return jwtVerify(token, new TextEncoder().encode(secret));
  } catch {
    return null;
  }
};

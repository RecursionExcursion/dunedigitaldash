import { NextResponse } from "next/server";
import { validateToken } from "./jwt";
import { MiddleWare, RouteHandler } from "./nextApi";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw Error("No JWT SECRET set");
}

export const INTERNAL_UID_HEADER = "x-internal-user-id";

export const authMW: MiddleWare = (rh) => {
  return async (req) => { 
    const authHeader = req.headers.get("Authorization");

    if (!authHeader) {
      return new NextResponse(null, { status: 401 });
    }

    const headerParts = authHeader.split(" ");

    if (headerParts.length !== 2 || headerParts[0] !== "Bearer") {
      return new NextResponse(null, { status: 401 });
    }

    const res = await validateToken(headerParts[1], JWT_SECRET);

    if (!res || !res.payload.sub) {
      return new NextResponse(null, { status: 401 });
    }

    const userId = res.payload.sub;

    // const requestHeaders = new Headers(req.headers);
    // requestHeaders.delete(INTERNAL_UID_HEADER);
    // requestHeaders.set(INTERNAL_UID_HEADER, userId);

    // rh(req);req
    req.headers.delete(INTERNAL_UID_HEADER);
    req.headers.set(INTERNAL_UID_HEADER, userId);
    return rh(req);
  };
};

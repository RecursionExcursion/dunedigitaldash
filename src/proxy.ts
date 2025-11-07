import { NextResponse, NextRequest } from "next/server";
import { verifyToken } from "./service/jwt-service";

export async function proxy(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/login")) {
    return NextResponse.next();
  }

  function routeToLogin() {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  const session = request.cookies.get("user-session");
  if (!session) return routeToLogin();

  const token = await verifyToken(session.value);
  if (!token) return routeToLogin();

  //set user header
  const res = NextResponse.next({
    request: {
      headers: new Headers(request.headers),
    },
  });

  res.headers.set("x-user-id", String(token.payload.sub));
  res.headers.set("x-user-name", String(token.payload.name));

  return res;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    {
      source:
        "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },

    {
      source:
        "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
      has: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },

    {
      source:
        "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
      has: [{ type: "header", key: "x-present" }],
      missing: [{ type: "header", key: "x-missing", value: "prefetch" }],
    },
  ],
};

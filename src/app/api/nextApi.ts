import { NextRequest, NextResponse } from "next/server";

export type RouteHandler = (req: NextRequest) => Promise<NextResponse>;
export type MiddleWare = (rh: RouteHandler) => RouteHandler;

export function pipe(...mws: MiddleWare[]) {
  return (final: RouteHandler): RouteHandler => {
    return mws.reduce((p, c) => c(p), final);
  };
}

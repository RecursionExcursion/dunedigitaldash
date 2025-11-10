import { NextResponse } from "next/server";
import { NewTaskrUser } from "../../../lib/taskr-types";
import taskrService from "../taskr-service";
import { pipe } from "../nextApi";
import { authMW, INTERNAL_UID_HEADER } from "../auth";

export async function POST(req: Request) {
  const newUser = (await req.json()) as NewTaskrUser;

  if (!newUser.username || !newUser.password) {
    return new Response(null, {
      status: 400,
    });
  }

  const res = await taskrService.createUser(newUser);

  if (res.ok()) {
    return new Response(null, {
      status: 201,
    });
  }
  return new Response(null, {
    status: res.code,
    statusText: res.msg,
  });
}
export const GET = pipe(authMW)(async function (req) {
  const id = req.headers.get(INTERNAL_UID_HEADER);
  if (!id) {
    return new NextResponse(null, { status: 404 });
  }
  const res = await taskrService.readUser(id);

  if (res.ok()) {
    return NextResponse.json(res.data);
  }

  return new NextResponse(null, { status: 500 });
});

export async function PUT(req: Request) {}

import { NextResponse } from "next/server";
import { NewTaskrUser, TaskrUser } from "../../../lib/taskr-types";
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
    return Response.json(res.data, {
      status: 201,
    });
  }
  return new Response(null, {
    status: res.code,
    statusText: res.msg,
  });
}
export const GET = pipe(authMW)(async (req) => {
  const id = req.headers.get(INTERNAL_UID_HEADER);
  if (!id) {
    return new NextResponse(null, { status: 404 });
  }
  const res = await taskrService.readUser(id);
  res.data.password = "";

  if (res.ok()) {
    return NextResponse.json(res.data);
  }

  return new NextResponse(null, { status: 500 });
});

export const PUT = pipe(authMW)(async (req) => {
  const id = req.headers.get(INTERNAL_UID_HEADER);
  if (!id) {
    return new NextResponse(null, { status: 404 });
  }

  const usr = (await req.json()) as TaskrUser;

  const res = await taskrService.updateUser(usr);

  return NextResponse.json(res.data, {
    status: res.code,
  });
});

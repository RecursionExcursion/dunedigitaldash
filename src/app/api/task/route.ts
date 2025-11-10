import { NextResponse } from "next/server";
import { authMW } from "../auth";
import { pipe } from "../nextApi";
import taskrService from "../taskr-service";

export const POST = pipe(authMW)(async function (req) {
  const { id, task } = await req.json();

  if (!id || !task) {
    return new NextResponse(null, { status: 400 });
  }

  const res = await taskrService.addTask(id, task);

  if (res.ok()) {
    return NextResponse.json(res.data, {
      status: 201,
    });
  }

  return new NextResponse(null, {
    status: res.code,
  });
});

export async function PUT(req: Request) {
  const { id, task } = await req.json();

  if (!id || !task) {
    return new Response(null, { status: 400 });
  }

  const res = await taskrService.updateTasks(id, task);

  if (res.ok()) {
    return Response.json(res.data, {
      status: 200,
    });
  }

  return new Response(null, {
    status: res.code,
  });
}

export async function DELETE(req: Request) {
  const { id, taskId } = await req.json();

  if (!id || !taskId) {
    return new Response(null, { status: 400 });
  }

  const res = await taskrService.deleteTask(id, taskId);

  return new Response(null, { status: res.code });
}

import { NextResponse } from "next/server";
import { authMW, INTERNAL_UID_HEADER } from "../auth";
import { pipe } from "../nextApi";
import taskrService from "../taskr-service";

export const POST = pipe(authMW)(async (req) => {
  const id = req.headers.get(INTERNAL_UID_HEADER);
  if (!id) {
    return new NextResponse(null, { status: 404 });
  }
  const { task } = await req.json();

  if (!task) {
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

export const PUT = pipe(authMW)(async (req) => {
  const id = req.headers.get(INTERNAL_UID_HEADER);
  if (!id) {
    return new NextResponse(null, { status: 404 });
  }

  const { tasks } = await req.json();

  if (!tasks) {
    return new NextResponse(null, { status: 400 });
  }

  const res = await taskrService.updateTasks(id, tasks);

  if (res.ok()) {
    return NextResponse.json(res.data, {
      status: 200,
    });
  }

  return new NextResponse(null, {
    status: res.code,
  });
});

export const DELETE = pipe(authMW)(async (req) => {
  const id = req.headers.get(INTERNAL_UID_HEADER);
  if (!id) {
    return new NextResponse(null, { status: 404 });
  }

  const { taskId } = await req.json();

  if (!taskId) {
    return new NextResponse(null, { status: 400 });
  }

  const res = await taskrService.deleteTask(id, taskId);

  return NextResponse.json(res.data, { status: res.code });
});

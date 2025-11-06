"use client";

import { ComponentPropsWithoutRef } from "react";
import Image from "next/image";
import { TaskrTask } from "../../lib/taskr";
import { bigArrowLeft, bigArrowRight } from "../../icons/arrows";
import imgs from "../../service/img-service";

type TaskColumnProps = {
  columneTitle: string;
  tasks: TaskrTask[];
  updateTaskStatus: (id: string, status: number) => void;
  colStatus: number;
};

export function TaskColumn(props: TaskColumnProps) {
  const { columneTitle, tasks, colStatus, updateTaskStatus } = props;

  return (
    <div className="flex flex-col gap-5">
      <h2>{columneTitle}</h2>
      {tasks.map((t) => {
        return (
          <TaskCard
            key={t.id}
            colStatus={colStatus}
            t={t} updateTaskStatus={updateTaskStatus} />
        );
      })}
    </div>
  );
}

function ChangeStatusButton(props: ComponentPropsWithoutRef<"button">) {
  return (
    <button className="cursor-pointer font-extrabold" {...props}>
      {props.children}
    </button>
  );
}


function TaskCard(props: {
  t: TaskrTask
  updateTaskStatus: (id: string, status: number) => void;
  colStatus: number
}) {
  const { t, updateTaskStatus, colStatus } = props

  return (
    <article
      className="overflow-hidden rounded-lg shadow-sm transition hover:shadow-lg dark:shadow-gray-700/25"
    >
      <div className="relative h-30">
        <Image
          fill
          //TODO
          // sizes="(max-width: 768px) 100vw, 50vw"
          src={imgs[t.imageKey ?? "fallback"]}
          alt=""
          className="rounded-xl object-cover shadow-xl transition group-hover:grayscale-50"
        />
      </div>

      <div className="bg-white p-4 sm:p-6 dark:bg-gray-900">
        <a href="#">
          <h3 className="mt-0.5 text-lg text-gray-900 dark:text-white">
            {t.title}
          </h3>
        </a>
        <time
          dateTime="2022-10-10"
          className="block text-xs text-gray-500 dark:text-gray-400"
        >
          Due: {new Date(t.dueDate).toLocaleDateString()}
        </time>

        <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500 dark:text-gray-400">
          {t.details}
        </p>
      </div>
      <div className="flex justify-between border-t border-white p-4 ">
        <ChangeStatusButton
          onClick={() => updateTaskStatus(t.id, colStatus - 1)}
        >
          {bigArrowLeft}
        </ChangeStatusButton>
        <ChangeStatusButton
          onClick={() => updateTaskStatus(t.id, colStatus + 1)}
        >
          {bigArrowRight}
        </ChangeStatusButton>
      </div>
    </article>
  )
}
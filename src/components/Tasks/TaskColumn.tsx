"use client";

import { ComponentPropsWithoutRef } from "react";
import Image from "next/image";
import { TaskrTask } from "../../lib/Taskr";
import { bigArrowLeft, bigArrowRight } from "../../icons/arrows";

type TaskColumnProps = {
  columneTitle: string;
  tasks: TaskrTask[];
  updateTaskStatus: (id: string, status: number) => void;
  status: number;
};

export function TaskColumn(props: TaskColumnProps) {
  const { columneTitle, tasks, status, updateTaskStatus } = props;

  return (
    <div className="flex flex-col gap-5">
      <h2>{columneTitle}</h2>
      {tasks.map((t) => {
        return (
          <article
            key={t.id}
            className="overflow-hidden rounded-lg shadow-sm transition hover:shadow-lg dark:shadow-gray-700/25"
          >
            <div className="relative h-30">
              <Image
                fill
                // sizes="(max-width: 768px) 100vw, 50vw"
                alt=""
                src="https://images.unsplash.com/photo-1639739767611-cc582846849f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170"
                // src="https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1770&amp;q=80"
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
                onClick={() => updateTaskStatus(t.id, status - 1)}
              >
                {bigArrowLeft}
              </ChangeStatusButton>
              <ChangeStatusButton
                onClick={() => updateTaskStatus(t.id, status + 1)}
              >
                {bigArrowRight}
              </ChangeStatusButton>
            </div>
          </article>
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

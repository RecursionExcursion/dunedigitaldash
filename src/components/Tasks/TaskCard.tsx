import { ComponentPropsWithoutRef } from "react";
import { TaskrTask } from "../../lib/Taskr";
import Image from "next/image";
import imgs from "../../service/img-service";
import { bigArrowLeft, bigArrowRight } from "../../icons/arrows";
import { trashCan } from "../../icons/trash";
import { useAppContext } from "../../context/AppContext";
import { peniclOn } from "../../icons/edit";

export function TaskCard(props: {
  t: TaskrTask;
  updateTaskStatus: (id: string, status: number) => void;
  colStatus: number;
}) {
  const { t, updateTaskStatus, colStatus } = props;
  const { removeTask } = useAppContext();

  return (
    <article className="overflow-hidden bg-task-600 rounded-lg shadow-md transition hover:shadow-lg border border-white">
      <div className="flex justify-between p-4">
        <button className="cursor-pointer text-white" onClick={() => {}}>
          {peniclOn}
        </button>
        <button
          className="cursor-pointer text-white"
          onClick={() => removeTask(t.id)}
        >
          {trashCan}
        </button>
      </div>
      <div className="relative h-30">
        <Image
          fill
          //TODO
          // sizes="(max-width: 768px) 100vw, 50vw"
          src={imgs[t.imageKey ?? "fallback"]}
          alt=""
          className="object-cover shadow-xl transition group-hover:grayscale-50"
        />
      </div>

      <div className="p-4 relative">
        <a href="#">
          <h3 className="mt-0.5 text-lg text-gray-900 dark:text-white">
            {t.title}
          </h3>
        </a>
        <time
          // dateTime="2022-10-10"
          className="block text-xs text-gray-500 dark:text-gray-400"
        >
          <span
            className={
              new Date(t.dueDate).setHours(0, 0, 0, 0) <
              new Date().setHours(0, 0, 0, 0)
                ? "text-red-700 bg-white px-2 block py-2 w-fit rounded absolute -top-4 right-2"
                : "text-white bg-task-400 px-2 block py-2 w-fit rounded absolute -top-4 right-2"
            }
          >
            Due: {new Date(t.dueDate).toLocaleDateString()}
          </span>
        </time>

        <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500 dark:text-gray-400">
          {t.details}
        </p>
      </div>
      <div className="flex justify-between border-t border-white p-4 text-white bg-task-400">
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
  );
}

function ChangeStatusButton(props: ComponentPropsWithoutRef<"button">) {
  return (
    <button className="cursor-pointer font-extrabold text-task-600" {...props}>
      {props.children}
    </button>
  );
}

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
    // <article className="overflow-hidden bg-task-600/30 md:bg-task-600 rounded-lg shadow-md transition hover:shadow-lg border border-task-accent-900">
    <article
      className="mx-auto rounded-full p-8 max-w-48 min-w-48 min-h-48 max-h-48
           bg-gradient-to-br from-white/30 via-white/5 to-transparent backdrop-blur-xs 
           border border-white/30 
           shadow-[inset_0_4px_10px_rgba(255,255,255,0.3),0_0_20px_rgba(255,255,255,0.2)]
           hover:shadow-[inset_0_6px_12px_rgba(255,255,255,0.4),0_0_30px_rgba(255,255,255,0.4)]
           transition-all duration-500 ease-out"
    >
      <div className="flex justify-between p-4 hidden md:block">
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
      <div className="relative h-30 hidden md:block">
        <Image
          fill
          //TODO
          // sizes="(max-width: 768px) 100vw, 50vw"
          src={imgs[t.imageKey ?? "fallback"]}
          alt=""
          className="object-cover shadow-xl transition group-hover:grayscale-50"
        />
      </div>

      <div className="relative">
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
                ? "text-red-700 bg-white px-2 block py-2 w-fit rounded md:absolute top-8 right-2"
                : "text-task-900 bg-white px-2 block py-2 w-fit rounded md:absolute top-8 right-2"
            }
          >
            Due: {new Date(t.dueDate).toLocaleDateString()}
          </span>
        </time>

        <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500 dark:text-gray-400 hidden md:block">
          {t.details}
        </p>
      </div>
      <div className="flex justify-between p-4 text-white bg-transparent">
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
    <button className="cursor-pointer font-extrabold text-white" {...props}>
      {props.children}
    </button>
  );
}

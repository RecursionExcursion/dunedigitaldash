import { ComponentPropsWithoutRef } from "react";
import { TaskrTask } from "../../lib/taskr";
import Image from "next/image";
import imgs from "../../service/img-service";
import { bigArrowLeft, bigArrowRight } from "../../icons/arrows";
import { trashCan } from "../../icons/trash";
import { useAppContext } from "../../context/AppContext";
import { peniclOn } from "../../icons/edit";

export function TaskCard(props: {
    t: TaskrTask
    updateTaskStatus: (id: string, status: number) => void;
    colStatus: number
}) {
    const { t, updateTaskStatus, colStatus } = props
    const { removeTask } = useAppContext()

    return (
        <article
            className="overflow-hidden rounded-lg shadow-sm transition hover:shadow-lg dark:shadow-gray-700/25"
        >
            <div className="flex justify-between px-2 py-1">
                <button className="cursor-pointer" onClick={() => { }}>
                    {peniclOn}
                </button>
                <button className="cursor-pointer" onClick={() => removeTask(t.id)}>
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
                    // dateTime="2022-10-10"
                    className="block text-xs text-gray-500 dark:text-gray-400"
                ><span className={new Date(t.dueDate).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0) ? "text-red-500" : ""}>
                        Due: {new Date(t.dueDate).toLocaleDateString()}
                    </span>
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

function ChangeStatusButton(props: ComponentPropsWithoutRef<"button">) {
    return (
        <button className="cursor-pointer font-extrabold" {...props}>
            {props.children}
        </button>
    );
}
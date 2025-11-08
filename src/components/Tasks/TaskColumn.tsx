"use client";

import { TaskrTask } from "../../lib/Taskr";
import { TaskCard } from "./TaskCard";

type TaskColumnProps = {
  columneTitle: string;
  tasks: TaskrTask[];
  updateTaskStatus: (id: string, status: number) => void;
  colStatus: number;
};

export function TaskColumn(props: TaskColumnProps) {
  const { columneTitle, tasks, colStatus, updateTaskStatus } = props;

  return (
    <div className="overflow-x-scroll flex flex-1 justify-center flex-row md:flex-col w-full md:min-h-full gap-5 px-4 md:p-8 rounded text-3xl text-white text-shadow-md font-bold w-full relative">
      <h2 className="text-center absolute left-2 md:relative">{columneTitle}</h2>
      {tasks.map((t) => {
        return (
          <TaskCard
            key={t.id}
            colStatus={colStatus}
            t={t}
            updateTaskStatus={updateTaskStatus}
          />
        );
      })}
    </div>
  );
}

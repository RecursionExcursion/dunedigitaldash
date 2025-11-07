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
    <div className="flex flex-col min-h-full gap-5 bg-task-accent-600 border border-white p-8 rounded text-3xl text-white text-shadow-md font-bold w-full">
      <h2 className="">{columneTitle}</h2>
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
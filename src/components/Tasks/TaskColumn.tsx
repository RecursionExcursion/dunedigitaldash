"use client";

import { TaskrTask } from "../../lib/taskr";
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
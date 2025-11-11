"use client"

import { useEffect, useState } from "react";
import config from "../../../app-config.json" with {type: "json"}
import { TaskColumn } from "./TaskColumn";
import CreateTask from "../CreateTask";
import { TaskrTask } from "../../lib/taskr-types";
import { useAppContext } from "../../context/AppContext";
import { updateTasks } from "../../service/task-service";



export default function TaskBoard() {

  const { username, tasks, setTasks } = useAppContext()

  const [taskBuckets, setTaskBuckets] = useState<TaskrTask[][]>([])

  useEffect(() => {
    //load config

    (async () => {
      const tempTaskBucks: TaskrTask[][] = Array.from({ length: config.taskStatuses.length }, () => []);
      //load tasks from source

      //sort them against config
      tasks.forEach(t => {
        const bucket = tempTaskBucks[t.status]
        if (bucket) {
          bucket.push(t)
        } else {
          tempTaskBucks.at(t.status > tempTaskBucks.length ? -1 : 0)?.push(t)
        }
      })
      return tempTaskBucks
    })().then((buckets) => setTaskBuckets(buckets))
  }, [tasks])



  function updateStatus(id: string, status: number) {

    if (status < 0 || status > config.taskStatuses.length - 1) {
      return
    }

    const tmpBuckets = [...taskBuckets]

    taskBuckets.forEach((bucket, bi) => bucket.forEach((task, ti) => {
      if (task.id === id) {
        tmpBuckets[status] = [...tmpBuckets[status], task]
        tmpBuckets[bi].splice(ti, 1)
        task.status = status
      }
    }))

    //updates UI instantly 
    setTaskBuckets(tmpBuckets)

    //Updates db, results should match UI
    updateTasks(tmpBuckets.flat()).then((res) => {
      if (res.ok) setTasks(res.data.tasks)
    })
  }




  return (
    <div className="flex flex-col justify-center py-8 items-center w-full gap-10 container mx-auto flex-1" >
      <h1 className="text-5xl font-bold">{username + "'s"} TaskBoard</h1>
      <div className="flex justify-around w-full flex-1" >
        <div className="md:flex flex-col gap-8 flex-1 hidden">
          <CreateTask />
        </div>
        <div className="flex flex-col gap-8 md:flex-row md:flex-2 w-full">
          {taskBuckets.map((ts, i) =>
            <TaskColumn key={i} columneTitle={config.taskStatuses[i]} tasks={taskBuckets[i]} updateTaskStatus={updateStatus} colStatus={i} />
          )}
        </div>
      </div>
    </div>
  );
}



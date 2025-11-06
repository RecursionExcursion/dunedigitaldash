"use client"

import { useEffect, useState } from "react";
import config from "../../../app-config.json" with {type: "json"}
import { TaskColumn } from "./TaskColumn";
import CreateTask from "../CreateTask";
import { TaskrTask } from "../../lib/taskr";
import { useAppContext } from "../../context/AppContext";
import CreateUser from "../CreateUser";



export default function TaskBoard() {

  const { username, tasks } = useAppContext()

  const [taskBuckets, setTaskBuckets] = useState<TaskrTask[][]>([])

  console.log({ tasks });



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

  useEffect(() => {
    console.log({ taskBuckets });
  }, [taskBuckets])

  function updateStatus(id: string, status: number) {

    if (status < 0 || status > config.taskStatuses.length - 1) {
      return
    }

    const tmpBuckets = [...taskBuckets]

    taskBuckets.forEach((bucket, bi) => bucket.forEach((task, ti) => {
      if (task.id === id) {
        tmpBuckets[status] = [...tmpBuckets[status], task]
        tmpBuckets[bi].splice(ti, 1)
      }
    }))

    setTaskBuckets(tmpBuckets)
  }


  return (
    <div className="flex flex-col justify-center items-center w-full gap-10" >
      <h1>{username + "'s"} TaskBoard</h1>
      <div className="flex justify-around w-full" >
        <div>
          <CreateTask />
          <CreateUser />
        </div>
        <div className="flex gap-20">
          {taskBuckets.map((ts, i) =>
            <TaskColumn key={i} columneTitle={config.taskStatuses[i]} tasks={taskBuckets[i]} updateTaskStatus={updateStatus} colStatus={i} />
          )}
        </div>
      </div>
    </div>
  );
}



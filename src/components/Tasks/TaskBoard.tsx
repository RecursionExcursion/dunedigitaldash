"use client"

import { useEffect, useState } from "react";
import config from "../../../app-config.json" with {type: "json"}
import { TaskColumn } from "./TaskColumn";
import CreateTask from "../CreateTask";
import { TaskrTask } from "../../lib/Taskr";
import { useAppContext } from "../../context/AppContext";
import CreateUser from "../CreateUser";
import { updateTasks } from "../../service/taskr-service";
import LoginUser from "../LoginUser";



export default function TaskBoard() {

  const { userId, username, tasks, loadUserDebounced } = useAppContext()

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
    updateTasks(userId, tmpBuckets.flat()).then(loadUserDebounced)
  }




  return (
    <div className="flex flex-col justify-center items-center w-full gap-10" >
      <h1>{username + "'s"} TaskBoard</h1>
      <div className="flex justify-around w-full" >
        <div className="flex flex-col gap-8">
          <CreateTask />
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



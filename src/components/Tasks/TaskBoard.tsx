"use client"

import { useEffect, useState } from "react";
import config from "../../../app-config.json" with {type: "json"}
import { TaskColumn } from "./TaskColumn";
import CreateTask from "../CreateTask";
import { TaskrTask } from "../../lib/Taskr";

const TASKS: TaskrTask[] = [
  {
    id: "adsfsdfds",
    title: "Pet Foofs",
    dueDate: 1762171200000,    
    status: 0,
    details:"Pet that foofs"
  }, {
    id: "gdfhfdgh",
    title: "Love Foofs",
    dueDate: 1762257600000,
    status: 0,
    details:"love that foofs"
  }, {
    id: "ghfgnfgnfdn",
    title: "Hug Foofs",
    dueDate: 1762776000000,
    status: 10,
    details:"Hug that foofs"
  },

]



export default function TaskBoard() {

  const [taskBuckets, setTaskBuckets] = useState<TaskrTask[][]>([])

  useEffect(() => {
    //load config
    
    (async () =>{
      const tempTaskBucks: TaskrTask[][] = Array.from({ length: config.taskStatuses.length }, () => []);
      //load tasks from source

      //sort them against config
      TASKS.forEach(t => {
        const bucket = tempTaskBucks[t.status]
        if (bucket) {
          bucket.push(t)
        } else {
          tempTaskBucks.at(t.status > tempTaskBucks.length ? -1 : 0)?.push(t)
        }
      })
      return tempTaskBucks
    })().then((buckets)=>setTaskBuckets(buckets))
  }, [])

  function updateStatus(id:string, status: number){

    if(status < 0 || status > config.taskStatuses.length -1){
      return
    }

    const tmpBuckets = [...taskBuckets]

    taskBuckets.forEach((bucket,bi)=>bucket.forEach((task,ti)=>{
      if(task.id === id){
        tmpBuckets[status]  = [...tmpBuckets[status] , task]
        tmpBuckets[bi].splice(ti,1)
      }
    }))

    setTaskBuckets(tmpBuckets)
  }


  return (
    <div>
      <CreateTask/>


      
      <>TaskBoard</>
      <div className="flex gap-20">
        {taskBuckets.map((ts, i) =>
          <TaskColumn key={i} columneTitle={config.taskStatuses[i]} tasks={taskBuckets[i]} updateTaskStatus={updateStatus} status={i} />
        )}
      </div>
    </div>
  );
}



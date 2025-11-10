import { NewTaskrTask } from "../lib/taskr-types";

export async function createTask(newTask: NewTaskrTask) {
    const res = await fetch("/api/task",{
        method:"POST",
        body: JSON.stringify({
            
        })
    })
}
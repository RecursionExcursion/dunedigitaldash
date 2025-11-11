"use client"

import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react"
import { TaskrTask } from "../lib/taskr-types"
import { logoutUser } from "../service/session-service"
import { getUser } from "../service/user-service"
import { deleteTask } from "../service/task-service"

type AppState = {
    userId: string
    username: string
    tasks: TaskrTask[],
    loadUser: () => void
    removeTask: (taskId: string) => void
    setTasks: (tasks: TaskrTask[]) => void
}

const AppContext = createContext<AppState>({
    userId: "",
    username: "",
    tasks: [],
    loadUser: () => { },
    removeTask: () => { },
    setTasks: () => { }
})

type AppProviderProps = {
    id: string,
    name: string
    children: ReactNode
}

export const AppProvider = (props: AppProviderProps) => {

    const [username, setUsername] = useState("")
    const [userId, setUserId] = useState("")
    const [tasks, setTasks] = useState<TaskrTask[]>([])

    function loadUser() {
        getUser().then((res) => {
            if (!res.ok) {
                loadUser()
                return
            }

            setUserId(props.id);
            setUsername(res.data.username);
            setTasks(res.data.tasks);
        })
    }

    function removeTask(taskId: string) {
        deleteTask(taskId).then(res => {
            if (res.ok) setTasks(res.data.tasks)
        })
    }

    useEffect(() => {
        loadUser()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (!userId) {
        return null
    }


    return (
        <AppContext.Provider value={{
            userId,
            username,
            tasks,
            loadUser,
            removeTask,
            setTasks
        }}>
            {props.children}
        </AppContext.Provider >
    )
}


export const useAppContext = () => useContext(AppContext)


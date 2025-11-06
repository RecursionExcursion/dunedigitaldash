"use client"

import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react"
import { TaskrTask } from "../lib/taskr"
import { deleteTask, getUser } from "../service/taskr-service"
import { logoutUser } from "../service/session-service"

type AppState = {
    userId: string
    username: string
    tasks: TaskrTask[],
    loadUser: () => void
    loadUserDebounced: () => void
    removeTask: (taskId: string) => void
}

const AppContext = createContext<AppState>({
    userId: "",
    username: "",
    tasks: [],
    loadUser: () => { },
    loadUserDebounced: () => { },
    removeTask: () => { }
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
        console.log("loading");
        getUser(props.id).then((res) => {
            if (!res.ok) {
                logoutUser()
                return
            }


            setUserId(props.id);
            setUsername(res.data.username);
            setTasks(res.data.tasks);
        })
    }


    const loadUserTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    function loadUserDebounced() {
        if (loadUserTimeoutRef.current) {
            clearTimeout(loadUserTimeoutRef.current);
        }
        console.log("debouncing");

        loadUserTimeoutRef.current = setTimeout(() => {
            console.log("loading");
            loadUser();
        }, 5000);
    }


    function removeTask(taskId: string) {
        setTasks(tasks.filter(t => t.id !== taskId))
        deleteTask(userId, taskId).then(loadUserDebounced)
    }

    useEffect(() => {
        loadUser()
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
            loadUserDebounced,
            removeTask
        }}>
            {props.children}
        </AppContext.Provider >
    )
}


export const useAppContext = () => useContext(AppContext)


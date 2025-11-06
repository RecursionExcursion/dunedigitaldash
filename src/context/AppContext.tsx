"use client"

import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { TaskrTask } from "../lib/taskr"
import { getUser } from "../service/taskr-service"
import { logoutUser } from "../service/session-service"

type AppState = {
    userId: string
    username: string
    tasks: TaskrTask[],
    loadUser: () => void
}

const AppContext = createContext<AppState>({
    userId: "",
    username: "",
    tasks: [],
    loadUser: () => { }
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
            loadUser
        }}>
            {props.children}
        </AppContext.Provider >
    )
}


export const useAppContext = () => useContext(AppContext)
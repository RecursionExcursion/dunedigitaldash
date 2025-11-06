"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { Input } from "./general/Input";
import { useAppContext } from "../context/AppContext";
import Button from "./general/Button";
import { addTask } from "../service/taskr-service";
import imgs from "../service/img-service";

//TODO Move to file, so only happens once


export default function CreateTask() {

    const { loadUser, userId } = useAppContext()

    const [task, setTask] = useState({
        title: "",
        details: "",
        dueDate: "",
        status: 0,
        imgKey: ""
    });

    // const [imgKey, setImgKey] = useState<string>();

    useEffect(() => {
        (async () => {
            const date = new Date(Date.now());
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0"); // months are 0-indexed
            const day = String(date.getDate()).padStart(2, "0");
            return `${year}-${month}-${day}`;
        })().then((formatted) => {
            setTask((prev) => ({
                ...prev,
                dueDate: formatted,
            }));
        });
    }, []);

    return (
        <div className="w-50">
            <>CreateTask</>

            <form>
                <div>
                    <Input
                        label="Title"
                        value={task.title}
                        onChange={(e) => {
                            setTask((prev) => ({
                                ...prev,
                                title: e.target.value,
                            }));
                        }}
                    />
                    <Input
                        label="Details"
                        value={task.details}
                        onChange={(e) => {
                            setTask((prev) => ({
                                ...prev,
                                details: e.target.value,
                            }));
                        }}
                    />
                    <Input
                        label="Due Date"
                        type="date"
                        value={task.dueDate}
                        onChange={(e) => {
                            setTask((prev) => ({
                                ...prev,
                                dueDate: e.target.value,
                            }));
                        }}
                    />

                    <label htmlFor="Image">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                            Image
                        </span>
                        <select className="text-black bg-white" onChange={e => {
                            // setImgKey(e.target.value)
                            setTask(prev => ({
                                ...prev,
                                imgKey: e.target.value
                            }))
                        }} >
                            <option value="">--Please choose an option--</option>
                            {Object.entries(imgs).map(s => (
                                <option key={s[0]} value={s[0]}>{s[0]}</option>
                            ))}
                        </select>
                        {task.imgKey && (
                            <div className="relative h-30">
                                <Image
                                    fill
                                    alt=""
                                    src={imgs[task.imgKey]}
                                    className="rounded-xl object-cover shadow-xl transition group-hover:grayscale-50"
                                />
                            </div>
                        )}
                    </label>
                </div>
                <Button onClick={async (e) => {
                    e.preventDefault()

                    console.log({ task });

                    //in UTC 0
                    const epochDueDate = new Date(task.dueDate).getTime()

                    console.log(epochDueDate);



                    const res = await addTask(userId, {
                        title: task.title,
                        status: task.status,
                        details: task.details,
                        dueDate: epochDueDate,
                        imageKey: task.imgKey ? task.imgKey : undefined
                    })

                    if (res.ok) {
                        loadUser()
                        //clear fields
                    } else {
                        alert(res.msg)
                    }



                }}>
                    Create
                </Button>
            </form>
        </div>
    );
}



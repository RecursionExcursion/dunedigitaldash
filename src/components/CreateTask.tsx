"use client";

import Image from "next/image";
import {  useEffect, useState } from "react";
import config from "../../app-config.json" with {type: "json"}
import { Input } from "./general/Input";


const imgSrcs: Record<string, string> = {}
Object.entries(config.imageLinks).forEach(cat => {
    Object.entries(cat[1]).forEach(link => {
        imgSrcs[cat[0] + "|" + link[0]] = link[1] as string
    })
})

console.log({ imgSrcs });



export default function CreateTask() {
    const [task, setTask] = useState({
        title: "",
        details: "",
        dueDate: "",
        status: 0,
    });

    const [imgSrc, setImgSrc] = useState<string>();

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
                            setImgSrc(e.target.value)
                        }} >
                            <option value="">--Please choose an option--</option>
                            {Object.entries(imgSrcs).map(s => (
                                <option key={s[0]} value={s[1]}>{s[0]}</option>
                            ))}
                        </select>
                        {imgSrc && (
                            <div className="relative h-30">
                                <Image
                                    fill
                                    alt=""
                                    src={imgSrc}
                                    className="rounded-xl object-cover shadow-xl transition group-hover:grayscale-50"
                                />
                            </div>
                        )}
                    </label>
                </div>
            </form>
        </div>
    );
}



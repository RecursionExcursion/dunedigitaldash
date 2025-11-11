"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { Input } from "./general/Input";
import { useAppContext } from "../context/AppContext";
import Button from "./general/Button";
import imgs from "../service/img-service";
import { addTask } from "../service/task-service";

//TODO Move to file, so only happens once

export default function CreateTask() {
  const { loadUser } = useAppContext();

  const [task, setTask] = useState({
    title: "",
    details: "",
    dueDate: "",
    status: 0,
    imgKey: "",
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
    <div className="w-50 flex-1">
      <form className="bg-task-accent-300/30 border border-task-accent-400 p-8 rounded min-w-fit flex flex-col gap-4">
        <span className="w-full text-center text-white font-bold text-3xl text-shadow-md">
          CreateTask
        </span>
        <div className="flex flex-col gap-2">
          <Input
            tag="input"
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
            tag="textarea"
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
            tag="input"
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

          <label htmlFor="image" className="flex flex-col gap-2">
            <span className="text-white font-bold text-shdaow-md">
              Image
            </span>
            <select
              className="text-white bg-task-600 rounded border border-task-accent-900 text-lg/9 p-4"
              id="image"
              onChange={(e) => {
                // setImgKey(e.target.value)
                setTask((prev) => ({
                  ...prev,
                  imgKey: e.target.value,
                }));
              }}
            >
              <option value="">--Please choose an option--</option>
              {Object.entries(imgs).map((s) => (
                <option key={s[0]} value={s[0]}>
                  {s[0]}
                </option>
              ))}
            </select>
            {task.imgKey && (
              <div className="relative h-30 shadow-md">
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
        <Button
          onClick={async (e) => {
            e.preventDefault();
            //in UTC 0
            const epochDueDate = new Date(task.dueDate).getTime();

            const res = await addTask({
              title: task.title,
              status: task.status,
              details: task.details,
              dueDate: epochDueDate,
              imageKey: task.imgKey ? task.imgKey : undefined,
            });

            if (res.ok) {
              loadUser();
              //clear fields
            } else {
              alert(res.msg);
            }
          }}
        >
          Create
        </Button>
      </form>
    </div>
  );
}

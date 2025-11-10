"use client";

import { useState } from "react";
import { Input } from "./general/Input";
import { createUser } from "../app/api/taskr-service";
import Button from "./general/Button";

export default function CreateUser() {
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
  });
  //TODO
  return (
    <div className="bg-task-accent-300/30 border border-task-accent-400 p-8 rounded min-w-fit flex flex-col gap-4">
      <span className="w-full text-center text-white font-bold text-3xl text-shadow-md">Create User</span>
      <Input
        tag="input"
        label="Username"
        onChange={(e) => {
          setNewUser((prev) => ({
            ...prev,
            username: e.target.value,
          }));
        }}
      />
      <Input
        tag="input"
        label="Password"
        onChange={(e) => {
          setNewUser((prev) => ({
            ...prev,
            password: e.target.value,
          }));
        }}
      />
      <Button
        onClick={async () => {
          if (!newUser.username || !newUser.password) {
            //TODO handle blank fields
            alert("All fields must be filled in!");
            return;
          }

          const res = await createUser({
            ...newUser,
            tasks: [],
          });
          //TODO
          if (res.ok) {
            alert("User created");
          } else {
            alert(res.msg);
          }
        }}
      >
        Save
      </Button>
    </div>
  );
}

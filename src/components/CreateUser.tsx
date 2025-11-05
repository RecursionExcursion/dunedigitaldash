"use client";

import { useState } from "react";
import { Input } from "./general/Input";
import { createUser } from "../service/taskr-service";

export default function CreateUser() {
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
  });

  return (
    <div className="flex flex-col">
      <>Create User</>
      <Input
        label="Username"
        onChange={(e) => {
          setNewUser((prev) => ({
            ...prev,
            username: e.target.value,
          }));
        }}
      />
      <Input
        label="Password"
        onChange={(e) => {
          setNewUser((prev) => ({
            ...prev,
            password: e.target.value,
          }));
        }}
      />
      <button
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
      </button>
    </div>
  );
}

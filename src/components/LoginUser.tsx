"use client";

import { useState } from "react";
import { Input } from "./general/Input";
import Button from "./general/Button";
import { useRouter } from "next/navigation";
import { login } from "../service/user-service";

export default function LoginUser() {
  const [userLogin, setUserLogin] = useState({
    username: "",
    password: "",
  });

  const router = useRouter();
  return (
    <div className="bg-task-accent-300/30 border border-task-accent-400 p-8 rounded min-w-fit flex flex-col gap-4">
      <span className="w-full text-center text-white font-bold text-3xl text-shadow-md">
        Login
      </span>

      <Input
        tag="input"
        label="Username"
        onChange={(e) => {
          setUserLogin((prev) => ({
            ...prev,
            username: e.target.value,
          }));
        }}
      />
      <Input
        tag="input"
        label="Password"
        onChange={(e) => {
          setUserLogin((prev) => ({
            ...prev,
            password: e.target.value,
          }));
        }}
      />
      <Button
        onClick={async () => {
          if (!userLogin.username || !userLogin.password) {
            alert("Username and password required");
            return;
          }
          const res = await login(userLogin.username, userLogin.password);

          if (res.ok) {
            // alert("User logged in")
            router.push("/");
            return;
          } else {
            alert(res.msg);
          }
        }}
      >
        Login
      </Button>
    </div>
  );
}

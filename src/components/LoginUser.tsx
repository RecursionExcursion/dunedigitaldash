"use client";

import { useState } from "react";
import { Input } from "./general/Input";
import Button from "./general/Button";
import { loginUser } from "../service/taskr-service";
import { useRouter } from "next/navigation";

export default function LoginUser() {
    const [userLogin, setUserLogin] = useState({
        username: "",
        password: "",
    });

    const router = useRouter()
    return (
        <div className="flex flex-col justify-center items-center h-full">
            <Input
                label="Username"
                onChange={(e) => {
                    setUserLogin((prev) => ({
                        ...prev,
                        username: e.target.value,
                    }));
                }}
            />
            <Input
                label="Password"
                onChange={(e) => {
                    setUserLogin((prev) => ({
                        ...prev,
                        password: e.target.value,
                    }));
                }}
            />
            <Button onClick={async () => {
                if (!userLogin.username || !userLogin.password) {
                    alert("Username and password required")
                    return
                }
                const res = await loginUser(userLogin.username, userLogin.password)

                if (res.ok) {
                    // alert("User logged in")
                    router.push("/")
                    return
                } else {
                    alert(res.msg)
                }

            }}>Login</Button >
        </div>
    );
}

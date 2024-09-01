"use client";

import { apiClient } from "@/lib";
import { useAppStore } from "@/store";
import { ADMIN_API_ROUTES } from "@/utils";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {setUserInfo} = useAppStore();
  const router = useRouter();

  async function handleLogin() {
    try {
      const response = await apiClient.post(ADMIN_API_ROUTES.LOGIN, {
        email,
        password,
      });

      console.log(response);
      if (response?.data?.userInfo) {
        setUserInfo(response?.data?.userInfo);
        console.log(response.data.userInfo);
        toast.success("Logged In Successfully");
        router.push("/admin");
      } else {
        toast.error("Invalid Credentials");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-[#F2F0EF]">
      <Card className="shadow-2xl w-[400px] m-6">
        <CardHeader className="text-2xl font-semibold text-center flex items-center justify-center uppercase">
          Admin Login
        </CardHeader>
        <CardBody className="w-full">
          <div className="flex flex-col items-center justify-center gap-3">
            <Input
              type="email"
              label="Email"
              value={email}
              variant="bordered"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <Input
              type="password"
              label="Password"
              value={password}
              variant="bordered"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
        </CardBody>
        <CardFooter>
          <Button className="w-full" size="lg" onClick={handleLogin}>
            Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;

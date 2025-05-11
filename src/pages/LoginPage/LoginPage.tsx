// import { Card } from "@/components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const LoginPage = () => {
  const [email, setEmail] = useState("maria@mail.com");
  const [password, setPassword] = useState("");

  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: loginFn,
    onSuccess: (data) => {
      console.log(data);
      queryClient.setQueryData(["userTokenData"], data);
      getUserProfile(data.access_token).then((userProfile) => {
        queryClient.setQueryData(["userProfile"], userProfile);
      });
      navigate(`/products`);
    },
    onError: (error) => {
      // An error happened!
      toast.error("Login Failed", {
        description: "Please check your credentials and try again.",
      });
      console.log(error);
    },
  });

  let navigate = useNavigate();

  const handleLogin = () =>
    loginMutation.mutate({ email: email, password: password });

  return (
    <>
      <div className="">
        <h1 className="text-center text-3xl font-bold mt-20 mb-10">
          Welcome to the <br /> Mini Store
        </h1>
        <Card className="w-100 mx-auto">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Enter your email and password</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Input
              placeholder="user@example.com"
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="12345"
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </CardContent>
          <CardFooter>
            <Button onClick={handleLogin}>Login</Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default LoginPage;

const loginFn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const response = await fetch("http://localhost:3000/api/v1/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
  if (!response.ok) {
    throw new Error("Login Failed: " + response.statusText);
  }
  return response.json();
};

const getUserProfile = async (access_token: string) => {
  const response = await fetch("http://localhost:3000/api/v1/auth/profile", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Fetching user profile failed: " + response.statusText);
  }
  return response.json();
};

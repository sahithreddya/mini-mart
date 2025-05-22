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
import { useMutation, useQuery } from "@tanstack/react-query";
import { Navigate, useNavigate } from "react-router";
import { toast } from "sonner";
import { useAuth } from "../../Context/AuthProvider";
import { getUserProfile, loginUser } from "../../APIs";

const LoginPage = () => {
  const auth = useAuth();
  const [email, setEmail] = useState("john@mail.com");
  const [password, setPassword] = useState("");

  useQuery({
    queryKey: ["profile"],
    queryFn: getUserProfile,
    enabled: !!auth.token,
  });

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      auth.setToken(data.access_token); // setting token in local storage
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
      {auth.token ? (
        <Navigate to="/products" />
      ) : (
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
                placeholder="changeme"
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
      )}
    </>
  );
};

export default LoginPage;

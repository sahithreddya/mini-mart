import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../Context/AuthProvider";

const HomePage = () => {
  const auth = useAuth();

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const userData = queryClient.getQueryData(["userProfile"]);

  useEffect(() => {
    if (!auth?.token) {
      console.log("not logged in");
      navigate("/login");
    } else {
      console.log("user already logged in ", userData);

      navigate(`/products`);
    }
  }, []);

  return (
    <>
      <h1>redirecting...</h1>
    </>
  );
};

export default HomePage;

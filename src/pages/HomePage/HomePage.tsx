import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../Context/AuthProvider";

const HomePage = () => {
  const auth = useAuth();

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const userData = queryClient.getQueryData(["userProfile"]);

  console.log("in home page");

  return (
    <>
      <h1>homepage...</h1>
    </>
  );
};

export default HomePage;

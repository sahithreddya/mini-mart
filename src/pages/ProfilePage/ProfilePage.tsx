import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../Context/AuthProvider";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "../../components/ui/card";
const ProfilePage = () => {
  const auth = useAuth();
  let profileQuery;

  profileQuery = useQuery({
    queryKey: ["profile", auth.token],
    queryFn: getUserProfile,
  });

  if (profileQuery?.isPending) return <div>Loading</div>;
  if (profileQuery?.isError)
    return <div>Error: {profileQuery.error.message}</div>;

  return (
    <>
      <h1 className="text-4xl font-bold text-center py-10">
        {profileQuery?.data
          ? profileQuery.data.name + "'s Profile"
          : "Loading..."}
      </h1>
      <div className="flex flex-col gap-8">
        <Card className="flex flex-1/3 flex-row w-[80%] mx-auto">
          <CardContent className="">
            <img
              className="w-100"
              src={profileQuery?.data?.avatar}
              alt={profileQuery?.data?.name}
            />
          </CardContent>
          <CardContent className="flex flex-2/3 flex-col gap-8">
            <CardTitle className="text-xl">
              {profileQuery?.data?.name}
            </CardTitle>
            <p>{profileQuery?.data?.email}</p>
            <p>{profileQuery?.data?.role}</p>
            <CardDescription>
              Profile created at{" "}
              {new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              }).format(new Date(profileQuery?.data?.creationAt))}
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

const getUserProfile = ({ queryKey }: { queryKey: any }) => {
  const [_, access_token] = queryKey;
  return fetch("http://localhost:3000/api/v1/auth/profile", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  }).then((res) => res.json());
};

export default ProfilePage;

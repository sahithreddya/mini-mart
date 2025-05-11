import { useQueryClient } from "@tanstack/react-query";
import type { User } from "../types";

const ProfilePage = () => {
  // const [quantity, setQuantity] = useState(1);

  // const productItemQuery = useQuery({
  //   queryKey: ["product-", id],
  //   queryFn: getProductDetailsById,
  // });

  const queryClient = useQueryClient();
  const userData: User | undefined = queryClient.getQueryData(["userProfile"]);

  // if (productItemQuery?.isPending) return <div>Loading</div>;
  // if (productItemQuery?.isError)
  //   return <div>Error: {productItemQuery.error.message}</div>;
  // else {
  //   console.log("productItemQuery", productItemQuery.data);
  // }

  return (
    <>
      <h1 className="text-4xl font-bold text-center py-10">
        ${userData?.name}'s Profile
      </h1>
      {/* <div className="flex flex-col gap-8">
        <Card className="flex flex-1/3 flex-row w-[80%] mx-auto">
          <CardContent className="">
            <img
              className="w-100"
              src={productItemQuery?.data?.images[0]}
              alt={productItemQuery?.data?.title}
            />
          </CardContent>
          <CardContent className="flex flex-2/3 flex-col gap-8">
            <CardTitle className="text-xl">
              {productItemQuery?.data?.title}
            </CardTitle>
            <p className="text-3xl">${productItemQuery?.data?.price}</p>
            <div className="flex gap-[10%]">
              <div className="flex gap-2 items-center">
                <Button
                  variant={"ghost"}
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus />
                </Button>
                <Input className="w-10 text-center" value={quantity} />
                <Button
                  variant={"ghost"}
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus />
                </Button>
              </div>
              <Button onClick={() => {}}>Add to cart</Button>
            </div>
            <CardDescription>
              {productItemQuery?.data?.description}
            </CardDescription>
          </CardContent>
        </Card>
      </div> */}
    </>
  );
};

export default ProfilePage;

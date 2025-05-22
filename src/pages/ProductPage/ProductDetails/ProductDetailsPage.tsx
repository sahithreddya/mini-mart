import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Plus, Minus } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../../../Context/AuthProvider";
import { getProductDetailsById } from "../../../APIs";

const ProductDetailsPage = () => {
  const queryClient = useQueryClient();
  const auth = useAuth();
  const [quantity, setQuantity] = useState(1);

  let { id } = useParams(); // getting the product id from the url

  useEffect(() => {
    queryClient.resetQueries({
      queryKey: ["product", auth?.token, Number(id)],
      exact: true,
    });
    queryClient.invalidateQueries({
      queryKey: ["product", Number(id)],
    });
  }, []); // revalidating on mount

  const productItemQuery = useSuspenseQuery({
    queryKey: ["product", Number(id)],
    queryFn: getProductDetailsById,
  });

  if (productItemQuery?.isError)
    return <div>Error: {productItemQuery.error.message}</div>;
  else {
    if (!productItemQuery.isFetching)
      console.log("serving cached productDetails data");
    else console.log("stale...fetching fresh productDetails data");
  }
  const productData = productItemQuery.data;

  return (
    <>
      <h1 className="text-4xl font-bold text-center py-10">Product ID: {id}</h1>
      <div className="flex flex-col gap-8 items-center">
        {/* {productItemQuery?.isFetching && <p>Fetching product...</p>} */}

        <Card className="flex flex-row w-[80%] mx-auto gap-6 p-6">
          <CardContent className="flex-2/3 p-0">
            <img
              className="w-100"
              src={productData?.images[0]}
              alt={productData?.title}
            />
          </CardContent>
          <CardContent className="flex flex-1/3 flex-col gap-8 p-0">
            <CardTitle className="text-xl">{productData?.title}</CardTitle>
            <p className="text-3xl">${productData?.price}</p>
            <div className="flex justify-between">
              <div className="flex gap-2 items-center">
                <Button
                  variant={"ghost"}
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus />
                </Button>
                <Input className="w-10 text-center" readOnly value={quantity} />
                <Button
                  variant={"ghost"}
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus />
                </Button>
              </div>
              <Button onClick={() => {}}>Add to cart</Button>
            </div>
            <CardDescription>{productData?.description}</CardDescription>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ProductDetailsPage;

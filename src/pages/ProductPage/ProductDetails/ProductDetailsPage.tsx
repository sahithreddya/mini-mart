import { useQuery } from "@tanstack/react-query";
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
import { useState } from "react";

const ProductDetailsPage = () => {
  const [quantity, setQuantity] = useState(1);

  let { id } = useParams();
  const productItemQuery = useQuery({
    queryKey: ["product", id],
    queryFn: getProductDetailsById,
  });

  if (productItemQuery?.isPending) {
    console.log("cold productDetails data");
    return <div>Loading</div>;
  }
  if (productItemQuery?.isError)
    return <div>Error: {productItemQuery.error.message}</div>;
  else {
    if (!productItemQuery.isFetching)
      console.log("serving cached productDetails data");
    else console.log("stale...fetching fresh productDetails data");

    console.log("productItemQuery", productItemQuery.data);
  }

  return (
    <>
      <h1 className="text-4xl font-bold text-center py-10">Product ID: {id}</h1>
      <div className="flex flex-col gap-8">
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
      </div>
    </>
  );
};

export default ProductDetailsPage;

export const getProductDetailsById = async ({
  queryKey,
}: {
  queryKey: any;
}) => {
  const [_, productId] = queryKey;
  const response = await fetch(
    `http://localhost:3000/api/v1/products/${productId}`
  );
  if (!response.ok) {
    throw new Error("Error while fetching product details");
  }
  console.log("fetched product data", response);

  return response.json();
};

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Outlet, useNavigate } from "react-router";
import type { Product } from "../types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { getProductDetailsById } from "./ProductDetails/ProductDetailsPage";

const ProductListPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const userData = queryClient.getQueryData(["userProfile"]);
  console.log("userData", userData);

  const productQuery = useQuery({
    queryKey: ["products"],
    queryFn: listProducts,
  });

  const prefetchProductById = async (id: number) => {
    await queryClient.prefetchQuery({
      queryKey: ["product", id],
      queryFn: getProductDetailsById,
    });
  };

  if (productQuery?.isPending) return <div>Loading</div>;
  if (productQuery?.isError)
    return <div>Error: {productQuery.error.message}</div>;

  return (
    <>
      <h1 className="text-4xl font-bold text-center py-10">Product List</h1>
      <div className="flex flex-wrap justify-around gap-8 w-80% mx-auto items-center">
        {productQuery?.data?.map((product: Product) => (
          <Card
            onClick={() => navigate(`/products/${product.id}`)}
            onMouseEnter={() => prefetchProductById(product.id)}
            key={product.id}
            className="flex-col w-50 hover:shadow-md shadow-(--ring) cursor-pointer"
          >
            <CardContent>
              <img src={product.images[0]} alt={product.title} />
            </CardContent>
            <CardHeader>
              <CardTitle>{product.title}</CardTitle>
            </CardHeader>
            <CardFooter>
              <CardContent>${product.price}</CardContent>
            </CardFooter>
          </Card>
          // <div
          //   className="flex-col w-50 border-1 border-(--border) rounded-(--radius) overflow-clip cursor-pointer bg-(--card) text-(--card-foreground) hover:shadow-md shadow-(--ring)"
          //   key={product.id}
          //   onClick={() => navigate(`/products/${product.id}`)}
          // >
          //   <img src={product.images[0]} alt={product.title} />
          //   <h2 className="p-2 font-medium">{product.title}</h2>
          //   {/* <p>{product.description}</p> */}
          // </div>
        ))}
      </div>
      <Outlet />
    </>
  );
};

export default ProductListPage;

const listProducts = async () => {
  const response = await fetch(
    "http://localhost:3000/api/v1/products?offset=0&limit=10"
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

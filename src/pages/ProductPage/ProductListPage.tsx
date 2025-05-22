import {
  keepPreviousData,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { Outlet, useNavigate } from "react-router";
import type { Cart, Product, UserProfile } from "../types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "../../components/ui/toggle-group";
import { useMemo, useState } from "react";
import { Button } from "../../components/ui/button";
import debounce from "lodash.debounce";
import { useAuth } from "../../Context/AuthProvider";

import {
  addUserCart,
  getProductCategories,
  getProductDetailsById,
  getProducts,
} from "../../APIs";

const ProductListPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const auth = useAuth();

  const [activeCategory, setActiveCategory] = useState<string>("");
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  console.log("activeCategory", activeCategory);

  const debouncedSearchKeyword = useMemo(
    () =>
      debounce((value: string) => {
        setSearchKeyword(value);
      }, 500),
    [searchKeyword]
  );

  const categoryQuery = useQuery({
    queryKey: ["categories"],
    queryFn: getProductCategories,
  });

  const {
    status,
    data,
    error,
    // isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: [
      "products",
      {
        category: activeCategory,
        searchKey: searchKeyword,
      },
    ],
    queryFn: getProducts,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
      // console.log("allPages", allPages);
      // console.log("allPageParams", allPageParams);
      if (lastPage.length === 0) {
        return undefined;
      }
      return lastPageParam + 10;
    },
    staleTime: Infinity,
    placeholderData: keepPreviousData, // keeps the previous data until new data is fetched
  });

  // const addToCartMutation = useMutation({
  //   onMutate: (variables) => {
  //     // console.log(variables);

  //     const oldCart: Cart = queryClient.getQueryData(["cart"]) ?? [];

  //     const product = oldCart.find(
  //       (item: any) => item.id === variables.productId
  //     );
  //     // console.log("cart", cart);
  //     oldCart.map((item: any) => {
  //       if (item.id === variables.productId) {
  //         item.quantity += 1;
  //       }
  //     });

  //     return { oldCart };
  //   },
  //   mutationFn: addUserCart,
  //   onSuccess: (data) => {
  //     // console.log(data);
  //   },
  //   onError: (error) => {
  //     // An error happened!
  //     // toast.error("Add to Cart Failed", {
  //     //   description: "Please try again.",
  //     // });
  //     // console.log(error);
  //   },
  //   onSettled: () => {
  //     queryClient.invalidateQueries({ queryKey: ["cart"] });
  //   },
  // });

  const prefetchProductById = async (id: number) => {
    queryClient.prefetchQuery({
      queryKey: ["product", id],
      queryFn: getProductDetailsById,
    });
  };

  // const handleAddProductToCart = (productId: number) => {
  //   const userProfile: UserProfile | undefined = queryClient.getQueryData([
  //     "profile",
  //     auth?.token,
  //   ]);
  //   console.log("userProfile", userProfile);

  //   if (userProfile) {
  //     addToCartMutation.mutate({
  //       productId: productId,
  //       quantityChange: 1,
  //     });
  //   }

  //   const cart = queryClient.getQueryData(["cart"]);
  //   // console.log(`cart has ${cart} of product ${productId}`);
  //   console.log("cart", cart);
  // };

  return (
    <>
      <div className="flex flex-col gap-2 my-10">
        <div className="flex flex-col gap-2 my-5">
          {categoryQuery?.data && (
            <div className="flex justify-center">
              <Input
                placeholder="search product"
                className="w-[30%] mx-auto"
                onChange={(e) => debouncedSearchKeyword(e.target.value)}
              />
            </div>
          )}
          {categoryQuery?.data && (
            <div className="flex justify-center">
              <ToggleGroup
                type="single"
                size={"lg"}
                variant="outline"
                className="gap-4"
                value={activeCategory}
                onValueChange={(value) => setActiveCategory(value)}
              >
                {categoryQuery?.data?.map((category: any) => (
                  <ToggleGroupItem
                    key={category.id}
                    value={category.slug}
                    className=""
                    aria-label="Toggle italic"
                    onClick={() => {}}
                  >
                    {category.name}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>
          )}
        </div>
        {status === "pending" && <div>Loading</div>}
        {status === "error" && <div>Error: {error.message}</div>}
        {status === "success" && (
          <>
            <div className="flex flex-wrap justify-center gap-8 w-80% mx-auto items-center">
              {data?.pages?.map((page: any) => {
                return page?.map((product: Product) => {
                  return (
                    <Card
                      onClick={() => navigate(`/products/${product.id}`)}
                      onMouseEnter={() => prefetchProductById(product.id)}
                      key={product.id}
                      className="flex-col w-50 hover:shadow-md shadow-(--ring)"
                    >
                      <CardContent>
                        <img src={product.images[0]} alt={product.title} />
                      </CardContent>
                      <CardHeader>
                        <CardTitle className="text-xs text-gray-400 uppercase">
                          {product.category.name}
                        </CardTitle>
                        <CardTitle>{product.title}</CardTitle>
                      </CardHeader>
                      <CardContent>${product.price}</CardContent>
                      <CardFooter>
                        <Button
                          variant={"outline"}
                          className="w-full cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation(); // prevent the click event from bubbling up to the parent
                            // handleAddProductToCart(product.id);
                          }}
                        >
                          Add to cart
                        </Button>
                      </CardFooter>
                    </Card>
                  );
                });
              })}
            </div>
            <div className="flex justify-center items-center py-10 gap-4 px-5">
              {hasNextPage === false ? (
                <>
                  <div className="h-0.5 flex-1 border-b-1 border-b-(--border)"></div>
                  <p className="text-sm text-gray-300 uppercase font-bold">
                    end of list
                  </p>
                  <div className="h-0.5 flex-1 border-b-1 border-b-(--border)"></div>
                </>
              ) : (
                <Button
                  onClick={() => fetchNextPage()}
                  disabled={!hasNextPage || isFetchingNextPage}
                >
                  {isFetchingNextPage ? "Loading more..." : "Load more items"}
                </Button>
              )}
            </div>
          </>
        )}
      </div>
      <Outlet />
    </>
  );
};

export default ProductListPage;

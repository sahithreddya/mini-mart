import type { Product } from "src/pages/types";
import { axiosInstance } from ".";

const getProducts = async ({
  queryKey,
  pageParam,
}: {
  queryKey: any;
  pageParam: number;
}): Promise<Product[]> => {
  const [_, { category, searchKey }] = queryKey;

  return await axiosInstance
    .get(
      "/products?limit=10&offset=" +
        pageParam +
        (searchKey ? "&title=" + searchKey : "") +
        (category ? "&categorySlug=" + category : "")
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

export default getProducts;

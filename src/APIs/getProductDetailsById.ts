import type { Product } from "src/pages/types";
import { axiosInstance } from ".";

const getProductDetailsById = async ({
  queryKey,
}: {
  queryKey: any;
}): Promise<Product> => {
  const [_, productId] = queryKey;

  return await axiosInstance
    .get(`/products/${productId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

export default getProductDetailsById;

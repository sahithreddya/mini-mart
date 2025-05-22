import type { ProductCategory } from "src/pages/types";
import { axiosInstance } from ".";

const getProductCategories = async (): Promise<ProductCategory[]> => {
  return await axiosInstance
    .get("/categories")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

export default getProductCategories;

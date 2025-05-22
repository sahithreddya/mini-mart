import { axiosInstance } from ".";

const addUserCart = async ({
  userId,
  products,
}: {
  userId: number;
  products: { id: number; quantity: number }[];
}) => {
  return await axiosInstance
    .post("/carts/add", {
      userId: userId,
      products: products,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

export default addUserCart;

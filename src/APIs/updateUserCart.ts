import { axiosInstance } from ".";

const updateUserCart = async ({ queryKey }: { queryKey: any }) => {
  const [_, { userId, productId, quantity }] = queryKey;

  return await axiosInstance
    .post("/carts/" + productId, {
      userId: userId,
      products: {
        id: productId,
        quantity: quantity,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

export default updateUserCart;

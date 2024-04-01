import axios from "axios";
import { useMutation, useQuery } from "react-query";

import { Product } from "../state/Products/types";

type ProductOrderTyoe = {
  id: number;
  quantity: number;
};

type UseOrderProductsParamsType = {
  userId: number;
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  order: ProductOrderTyoe[];
};

type UseGetProductsReturnType = {
  data: Product[];
};

export const useGetProducts = () => {
  const queryFn = async () => {
    const res = await axios.get("http://127.0.0.1:5000/products/");

    return res.data;
  };

  const query = useQuery({
    queryFn,
    queryKey: ["products"],
    onSuccess: (res) => console.log(res),
  });

  return query;
};

export const useOrderProducts = () => {
  const mutationFn = ({
    userId,
    firstName,
    lastName,
    address,
    email,
    order,
  }: UseOrderProductsParamsType) => {
    return axios.post(
      "http://127.0.0.1:5000/products/order",
      { userId, firstName, lastName, address, email, order },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  const mutation = useMutation({
    mutationFn,
    onSuccess: (response) => console.log(response),
    onError: (error) => console.log(error),
  });

  return mutation;
};

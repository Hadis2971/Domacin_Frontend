import axios, { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { Recension } from "../components/Product/components/ProductDetails/components/RecensionsList/types";
import { Product } from "../state/Products/types";
import { useAuthUser } from "./useAuth";

type ProductOrderType = {
  id: number;
  quantity: number;
  variationID?: number | null;
};

type UseOrderProductsParamsType = {
  userId?: number;
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  order: ProductOrderType[];
};

type UseRecensionParamsType = {
  userId?: number;
  productId?: number;
  title: string;
  description: string;
  firstName: string;
  lastName: string;
  rating: number;
};

export const useGetProducts = () => {
  const queryFn = async () => {
    const res = await axios.get("http://127.0.0.1:5000/products/");
    return res.data;
  };

  const query = useQuery({
    queryFn,
    queryKey: ["products"],
    onError: (error: AxiosError) => {
      console.log(error);
      const errorMsg = (error.response?.data ||
        "Greska Preuzimanja Proizvoda") as String;

      toast.error(errorMsg);
    },
  });

  return query;
};

export const useGetProductsBasedOnCategory = () => {
  const { category } = useParams();

  const queryFn = async () => {
    const res = await axios.get(
      `http://127.0.0.1:5000/products/${category?.slice(1)}`
    );

    return res.data;
  };

  const query = useQuery({
    queryFn,
    queryKey: ["products", category],
    onError: (error: AxiosError) => {
      console.log(error);
      const errorMsg = (error.response?.data ||
        "Greska Preuzimanja Proizvoda") as String;

      toast.error(errorMsg);
    },
  });

  return query;
};

export const useOrderProducts = () => {
  const queryClient = useQueryClient();

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
    // onSuccess: async (response, variables) => {
    //   const products = queryClient.getQueryData(["products"]) as Product[];

    //   // console.log(
    //   //   "useOrderProductsuseOrderProductsuseOrderProductsuseOrderProductsuseOrderProductsuseOrderProducts",
    //   //   products
    //   // );

    //   const updatedProducts = products?.map((product) => {
    //     //console.log("updatedProductsupdatedProductsupdatedProducts", product);

    //     const order = variables.order.find((order) => order.id === product.id);

    //     const variation = product.attribute?.variations?.find(
    //       (variation) => variation.id === order?.variationID
    //     );

    //     if (order) {
    //       if (!variation)
    //         return {
    //           ...product,
    //           stock: Number(product.stock) - order.quantity,
    //         };
    //       else {
    //         const variations = product.attribute.variations?.map((v) => {
    //           if (v.id === variation.id) {
    //             console.log("sasasasasasas", v, variation);

    //             return {
    //               ...v,
    //               stock: variation.stock - order.quantity,
    //             };
    //           } else return v;
    //         });

    //         return {
    //           ...product,
    //           attribute: { ...product.attribute, variations },
    //         };
    //       }
    //     } else {
    //       return product;
    //     }
    //   });

    //   console.log(
    //     "updatedProductsupdatedProductsupdatedProductsupdatedProducts",
    //     updatedProducts,
    //     updatedProducts === products
    //   );

    //   queryClient.setQueryData(["products"], updatedProducts);
    // },
    onError: (error: AxiosError) => {
      console.log(error);
      const errorMsg = (error.response?.data ||
        "Greska Narucivanja Proizvoda") as String;

      toast.error(errorMsg);
    },
  });

  return mutation;
};

export const useRecension = () => {
  const queryClient = useQueryClient();
  const { data: user } = useAuthUser();

  const mutationFn = ({
    title,
    description,
    rating,
    firstName,
    lastName,
    userId,
    productId,
  }: UseRecensionParamsType) => {
    return axios.post(
      "http://127.0.0.1:5000/products/recension",
      { title, description, rating, firstName, lastName, userId, productId },
      { headers: { "Content-Type": "application/json" } }
    );
  };

  const mutation = useMutation({
    mutationFn,
    onSuccess: async (response, variables) => {
      const products = (await queryClient.getQueryData([
        "products",
      ])) as Product[];

      const updatedProducts = products.map((product) => {
        if (product.id === variables.productId) {
          if (!product.recensions) product.recensions = [];

          const recension = {
            title: variables.title,
            description: variables.description,
            rating: variables.rating,
            firstName: variables.firstName,
            lastName: variables.lastName,
            verified: !!user,
          } as Recension;

          product.recensions = [...product.recensions, recension];
        }

        return product;
      });

      queryClient.setQueryData(["products"], updatedProducts);
    },
    onError: (error: AxiosError) => {
      console.log(error);
      const errorMsg = (error.response?.data ||
        "Greska Recenzije Proizvoda") as String;

      toast.error(errorMsg);
    },
  });

  return mutation;
};

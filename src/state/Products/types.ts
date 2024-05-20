import { ReactNode } from "react";

import { Recension } from "../../components/Product/components/ProductDetails/components/RecensionsList/types";

export type Product = {
  id: number;
  skuCode: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  price: number;
  stock?: number;
  recensions: Recension[] | [];
  images: string[];
  categories?: number[];
  verified: boolean | null;
};

export type ProductsContextProps = {
  children: ReactNode;
};

export type GetFormatedListOfSelectedProductsReturnType = {
  id: number;
  name: string;
  quantity: number;
  stock: number;
};

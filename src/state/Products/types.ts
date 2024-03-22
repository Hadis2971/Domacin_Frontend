import { ReactNode } from "react";

export type Product = {
  id: number;
  name: string;
  shortDescription: string;
  longDescription: string;
  price: number;
  stock?: number;
  recension?: number;
  images: string[];
  categories?: number[];
};

export type ProductsContextProps = {
  children: ReactNode;
};

export type GetFormatedListOfSelectedProductsReturnType = {
  id: number;
  name: string;
  quantity: number;
};

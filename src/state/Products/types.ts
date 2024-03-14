import { ReactNode } from "react";

export type Product = {
  id: number;
  title: string;
  shortDescription: string;
  longDescription: string;
  price: number;
  stock?: number;
  recension?: number;
  quantity?: number;
  images: string[];
  categories?: number[];
};

export type ProductsContextProps = {
  children: ReactNode;
};

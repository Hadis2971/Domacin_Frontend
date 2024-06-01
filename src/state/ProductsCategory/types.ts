import { ReactNode } from "react";

import { Recension } from "../../components/Product/components/ProductDetails/components/RecensionsList/types";

export enum PRODUCT_ATTRIBUTES {
  KOLICINA = 1,
  VELICINA,
  PAKOVANJE,
}

export type ProductAttributeVariation = {
  id: number;
  name: string;
  price: number;
  stock: number;
  variationID: number;
};

export type ProductAttribute = {
  type: number;
  variations: ProductAttributeVariation[] | null;
};

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
  attribute: ProductAttribute;
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
  price: number;
  attributeType?: number | null;
  attribute?: number | null;
  variationID?: number | null;
};

export type SelectedProduct = {
  id?: number;
  productID?: number;
  name: string;
  price: number;
  stock: number;
  attribute?: ProductAttribute | number | null;
  variationID?: number | null;
};

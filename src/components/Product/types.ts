import { Recension } from "./components/ProductDetails/components/RecensionsList/types";
import { ProductAttribute } from "../../state/Products/types";

export type ProductProps = {
  id: number;
  skuCode: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  price?: number;
  stock?: number;
  images: string[];
  categories?: number[];
  recensions: Recension[] | [];
  attribute: ProductAttribute;
};

export type ImagesCarouselProps = {
  id: number;
  images?: string[];
};

export type ImagesCarouselPropsState = {
  currentImage: number;
  type: string;
};

export type ProductDetailsProps = {
  averageRaiting: number;
  variationID?: number;
  onClose: () => void;
} & ProductProps;

export enum Categories {
  Catgory1 = 1,
  Catgory2,
  Catgory3,
  Catgory4,
  Catgory5,
  Catgory6,
  Catgory7,
  Catgory8,
  Catgory9,
  Catgory10,
  Catgory11,
  Catgory12,
  Catgory13,
  Catgory14,
  Catgory15,
  Catgory16,
}

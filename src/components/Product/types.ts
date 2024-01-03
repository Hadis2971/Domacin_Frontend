import { Dispatch, SetStateAction } from "react";

export type ProductProps = {
  id: number;
  title: string;
  description: string;
  price: number;
  stock?: number;
  recension?: number;
  quantity?: number;
  images: string[];
  categories?: number[];
};

export type ImagesCarouselProps = {
  id: number;
  images?: string[];
};

export type ImagesCarouselPropsState = {
  currentImage: number;
  type: string;
};

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
  images?: any[];
  currentImage: number;
  onHandleGetNextImage: () => void;
  onHandleGetPreviousImage: () => void;
  onSetCurrentImage: Dispatch<SetStateAction<number>>;
};

export type ProductProps = {
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

export type ImagesCarouselProps = {
  id: number;
  images?: string[];
};

export type ImagesCarouselPropsState = {
  currentImage: number;
  type: string;
};

export type ProductDetailsProps = {
  onClose: () => void;
} & ProductProps;

export type ProductProps = {
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

export type RatingProps = {
  ratingSpan: number;
  element: JSX.Element;
  elementSize: string;
  elementSelectedColor: string;
  ratingNumber?: number;
  disabled?: boolean;
  onSelect?: (number: number) => void;
};

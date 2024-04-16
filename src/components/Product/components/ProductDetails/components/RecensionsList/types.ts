export type Recension = {
  id: number;
  title: string;
  description: string;
  rating: number;
  email: string;
};

export type RecensionsListProps = {
  recensions: Recension[];
};

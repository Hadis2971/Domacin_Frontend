export type Recension = {
  id: number;
  title: string;
  description: string;
  rating: number;
  firstName: string;
  lastName: string;
};

export type RecensionsListProps = {
  recensions: Recension[];
};

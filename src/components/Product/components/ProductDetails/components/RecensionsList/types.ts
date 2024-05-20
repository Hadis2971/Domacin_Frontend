export type Recension = {
  id: number;
  title: string;
  description: string;
  rating: number;
  firstName: string;
  lastName: string;
  verified: boolean | null;
};

export type RecensionsListProps = {
  recensions: Recension[];
};

export type ArticleProps = {
  id: number;
  title: string;
  description: string;
  firstName: string;
  lastName: string;
  images: string[];
  categories: number[];
  comments: ArticleComment[];
};

export type ArticleComment = {
  id: number;
  text: string;
  firstName: string;
  lastName: string;
  timestamp: string;
  verified: boolean | null;
};

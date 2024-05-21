export type Article = {
  id: number;
  firstName: string;
  lastName: string;
  title: string;
  description: string;
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

export type ArticleProps = {
  articles: Article[];
};
